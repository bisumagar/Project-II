const productService =require("../service/productService.js");


const createProduct = async(req,res)=>{
    try {
        if (!req.body) {
            return res.status(400).send({ error: "Request body is missing. Set Body -> raw -> JSON in Postman." });
        }
        const product=await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        const status = error.message?.startsWith("Missing required field:") ? 400 : 500;
        return res.status(status).send({error:error.message});
        
    }
}

const deleteProduct = async(req,res)=>{
    const productId=req.params.id;
    try {
        const product=await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}

const updateProduct = async(req,res)=>{
    const productId=req.params.id;
    try {
        if (!req.body) {
            return res.status(400).send({ error: "Request body is missing. Set Body -> raw -> JSON in Postman." });
        }
        const product=await productService.updateProduct(productId,req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}

const findProductById = async(req,res)=>{
    const productId=req.params.id;
    try {
        if (!productId) {
            return res.status(400).send({ error: "Product id is required" });
        }
        const product=await productService.findProductById(productId);
        return res.status(200).send(product);
    } catch (error) {
        // CastError or not found should be treated as 404
        if (error.name === "CastError") {
            return res.status(404).send({ error: "Invalid product id" });
        }
        return res.status(500).send({error:error.message});
        
    }
}

const getAllProducts = async(req,res)=>{
    try {
        const products=await productService.getAllProducts(req.query);
        return res.status(201).send(products);
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}
const createMultipleProduct = async(req,res)=>{
    const productId=req.params.id;
    try {
        const product=await productService.createMultipleProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({message:"Products created successfully!"});
        
    }
}

module.exports={
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    createMultipleProduct,
    findProductById
};