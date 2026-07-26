const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

async function createProduct(reqData = {}) {
    const requiredFields = ["topLevelCategory", "secondLevelCategory", "thirdLevelCategory"];
    for (const field of requiredFields) {
        if (!reqData?.[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1,
        });
        await topLevel.save();
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2,
        });
        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3,
        });
        await thirdLevel.save();
    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.sizes,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    });

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);
    if (!product) {
        throw new Error("Product not found with id " + productId);
    }
    // Soft delete so existing orders can still populate product details
    product.deleted = true;
    product.quantity = 0;
    await product.save();
    return "Product deleted successfully!";
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData, { new: true });
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
        throw new Error("Product not found with id " + id);
    }
    return product;
}

async function getAllProducts(reqQuery) {
    let {
        category,
        color,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        sort,
        stock,
        pageNumber,
        pageSize,
    } = reqQuery;

    // Ensure numeric and sane pagination values
    pageNumber = Number(pageNumber) || 1;
    pageSize = Number(pageSize) || 10;
    if (pageNumber < 1) pageNumber = 1;
    if (pageSize < 1) pageSize = 10;

    let query = Product.find({ deleted: { $ne: true } }).populate("category");

    if (category) {
        const existCategory = await Category.findOne({ name: category });
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }

    if (color) {
        const colorSet = new Set(
            color.split(",").map((c) => c.trim().toLowerCase())
        );
        const colorRegex =
            colorSet.size > 0
                ? new RegExp([...colorSet].join("|"), "i")
                : null;
        if (colorRegex) {
            query = query.where("color").regex(colorRegex);
        }
    }

    if (sizes) {
        const sizesSet = new Set(
            typeof sizes === "string" ? sizes.split(",").map((s) => s.trim()) : sizes
        );
        query = query.where("sizes.name").in([...sizesSet]);
    }

    if (minPrice != null && maxPrice != null) {
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
            query = query
                .where("discountedPrice")
                .gte(min)
                .lte(max);
        }
    }

    if (minDiscount) {
        const minDisc = Number(minDiscount);
        if (!isNaN(minDisc)) {
            query = query.where("discountPercent").gt(minDisc);
        }
    }

    if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
        query = query.where("quantity").lte(0);
    }

    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    // Get count before applying skip/limit
    const totalProducts = await Product.countDocuments(query.getQuery());
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return {
        content: products,
        currentPage: Number(pageNumber),
        totalPages,
    };
}

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    
    getAllProducts,
    createMultipleProduct
    
};
