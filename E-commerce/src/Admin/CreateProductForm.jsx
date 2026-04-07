
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../State/Products/Action";

const initialSizes=[
  {name:"S", quantity:0},
  {name:"M", quantity:0},
  {name:"L", quantity:0}
];


const CreateProductForm = () => {

  const [productData,setProductData] = useState({
    imageUrl:"",
    brand:"",
    title:"",
    color:"",
    discountedPrice:"",
    price:"",
    discountedPersent:"",
    size: initialSizes,
    quantity:"",
    topLevelCategory:"",
    secondLevelCategory:"",
    thirdLevelCategory:"",
    description:"",
  });

  const dispatch = useDispatch();

  const handleChange=(e)=>{
    const {name,value}= e.target;
    setProductData((prevState)=>({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name==="size_quantity"?name="quantity":name=e.target.name;

    const sizes = [...productData.size];
    sizes[index] [name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size:sizes,
    }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    try {
      setSubmitting(true);
      await dispatch(createProduct(productData));
      alert("Product is added successfully!");
      setProductData({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        discountedPrice: "",
        price: "",
        discountedPersent: "",
        size: initialSizes,
        quantity: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: "",
      });
    } catch (err) {
      alert(err?.response?.data?.error || err?.message || "Failed to add product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="createdProductContainer">
      <Typography
      variant="h3"
      sx={{textAlign:"center"}}
      className="py-10 text-center"
      >
       Add New Product
      </Typography>

      <form 
      onSubmit={handleSubmit}
      className="createdProductContainer min-h-screen">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10">
          <div className="grid grid-cols-1 gap-4">
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />

            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />

            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountedPersent"
              value={productData.discountedPersent}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brand">Brand</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirt">T-shirt</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="mens_kurta">Men's Kurta</MenuItem>
                <MenuItem value="mens_jeans">Men's Jeans</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mt-4">
            <TextField 
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </div>

          <div className="mt-6 space-y-4">
            {productData.size.map((size, index)=>(
              <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event)=> handleSizeChange(event, index)}
                  required
                  fullWidth
                />

                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event)=> handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              fullWidth
              variant="contained"
              sx={{ p: 1.8, mt: 1 }}
              size="large"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add New Product"}
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
};

export default CreateProductForm;
