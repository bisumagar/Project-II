import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, findProducts } from "../State/Products/Action"

const ProductsTable = () => {
  const dispatch= useDispatch();
  const { products } = useSelector((state) => state.product);

  console.log("products---",products)

  const handleProductsDelete=(productId)=>{
    dispatch(deleteProduct(productId))
  }

  useEffect (()=>{
    const data={
      Category:"",
      colors:[],
      sizes:[],
      minPrice:0,
      maxPrice:1000000,
      minDiscount:  0,
      sort: "price_low ",
      pageNumber: 0,
      pageSize:50,
      stock:""
    }

    dispatch(findProducts(data))

  },[products.deletedProduct])
  return (
    <div className="p-5  ">
<Card className="mt=2">

  <CardHeader title="All Products "/>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
             <TableCell align="left">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(products || []).map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">
                <Avatar src={item.imageUrl}> </Avatar>
              </TableCell>
              <TableCell align="left" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="left">{item.category.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              <TableCell align="left"><Button onClick={()=>handleProductsDelete(item._id)} variant="outlined">
                    Delete
                </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


</Card>

      
    </div>
  )
}

export default ProductsTable
