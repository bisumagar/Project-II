import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CreateProductForm from '../CreateProductForm';
import CustomerTable from '../CustomerTable';
import Dashboard from '../Dashboard';
import OrdersTable from '../OrdersTable';
import ProductsTable from '../ProductsTable';



const menu=[
    {name:"Dashboard",path:"/admin",icon:<DashboardIcon/>},
    {name:"Products",path:"/admin/products",icon:<DashboardIcon/>},
    {name:"Customers",path:"/admin/customers",icon:<DashboardIcon/>},
    {name:"Orders",path:"/admin/orders",icon:<DashboardIcon/>},
    {name:"AddProducts",path:"/admin/product/create",icon:<DashboardIcon/>},
    // {name:"Dashboard",path:"/admin"},

]
const Admin = () => {
    const theme=useTheme();
    const isLargeScreen=useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible,setSideBarVisible] = useState(false);
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
      localStorage.removeItem("jwt");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    };

    const drawer=(
        <Box
        sx={{
            overflow:"auto",
            display:"flex",
            flexDirection:"column",
            height:"100%",
            justifyContent:"space-between"
        }}
        >
          {/* {isLargeScreen && <Toolbar/> } */}

          <List>
            {menu.map((item,index)=><ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
                <ListItemButton>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {item.name}
                    </ListItemText>
                </ListItemButton>
            </ListItem>)}
          </List>

          <List>
            <ListItem disablePadding >
                <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText>Account</ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleLogout}>
                <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItemButton>
            </ListItem>
          </List>

        </Box>
    )

  return (
    <div className='h-screen'>
      <CssBaseline/>

      {/* Fixed / sticky sidebar */}
      <div className='fixed top-0 left-0 h-screen w-[15%] border border-r-gray-300 bg-white'>
        {drawer}
      </div>

      {/* Scrollable main content area */}
      <div className='ml-[15%] h-screen w-[85%] overflow-y-auto'>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/product/create' element={<CreateProductForm/>}/>
          <Route path='/products/create' element={<CreateProductForm/>}/>
          <Route path='/products' element={<ProductsTable/>}/>
          <Route path='/orders' element={<OrdersTable/>}/>
          <Route path='/customers' element={<CustomerTable/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin
