import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, findProducts } from "../State/Products/Action"

const ProductsTable = () => {
  const dispatch= useDispatch();
  const { products } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("products---",products)

  const getSizeText = (item) => {
    const rawSizes = item?.sizes || item?.size || [];
    if (Array.isArray(rawSizes)) {
      const names = rawSizes
        .map((s) => (typeof s === "string" ? s : s?.name))
        .filter(Boolean);
      return names.length ? names.join(", ") : "-";
    }
    if (typeof rawSizes === "string") return rawSizes || "-";
    return "-";
  };

  const getSizeStockRows = (item) => {
    const rawSizes = item?.sizes || item?.size || [];
    if (!Array.isArray(rawSizes)) return [];
    return rawSizes
      .map((s) => {
        if (typeof s === "string") return { name: s, quantity: "-" };
        return {
          name: s?.name || "-",
          quantity: s?.quantity ?? 0,
        };
      })
      .filter((row) => row.name && row.name !== "-");
  };

  const handleProductsDelete=(productId)=>{
    dispatch(deleteProduct(productId))
  }

  const fuzzyMatch = (value, query) => {
    const source = String(value || "").toLowerCase();
    const target = String(query || "").trim().toLowerCase();
    if (!target) return true;
    if (source.includes(target)) return true;

    let queryIndex = 0;
    for (let i = 0; i < source.length && queryIndex < target.length; i += 1) {
      if (source[i] === target[queryIndex]) queryIndex += 1;
    }
    return queryIndex === target.length;
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products || [];

    return (products || []).filter((item) => {
      const searchableText = [
        item?.title,
        item?.category?.name,
        item?.color,
        item?.quantity,
        getSizeText(item),
        getSizeStockRows(item).map((row) => `${row.name} ${row.quantity}`).join(" "),
      ]
        .filter(Boolean)
        .join(" ");

      return fuzzyMatch(searchableText, searchTerm);
    });
  }, [products, searchTerm]);

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
  <div className="px-4 pb-3">
    <TextField
      fullWidth
      size="small"
      label="Search products"
      placeholder="Search title, category, color, size, quantity"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Color</TableCell>
            <TableCell align="left">Sizes</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
             <TableCell align="left">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(filteredProducts || []).map((item) => (
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
              <TableCell align="left">{item.color || "-"}</TableCell>
              <TableCell align="left">
                {getSizeText(item) === "-" ? (
                  "-"
                ) : (
                  <details>
                    <summary style={{ cursor: "pointer" }}>{getSizeText(item)}</summary>
                    <div className="mt-1 text-xs text-gray-600">
                      {getSizeStockRows(item).map((row) => (
                        <div key={`${item._id}-${row.name}`}>
                          {row.name}: {row.quantity}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </TableCell>
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
