import { Route, Routes } from 'react-router'
import Cart from '../customer/components/cart/Cart'
import CheckOut from '../customer/components/Checkout/CheckOut'
import Footer from '../customer/components/Footer/Footer'
import Navigation from '../customer/components/navigation/Navigation'
import Order from '../customer/components/Order/Order'
import OrderDetail from '../customer/components/Order/OrderDetail'
import Product from '../customer/components/product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import HomePage from '../customer/pages/HomePage/HomePage'



const CustomerRouters = () => {
  return (
    <div>
        <div>
          <Navigation/>
        </div>
      <Routes>
        <Route path='/login' element ={<HomePage/>}></Route>
         <Route path='/register' element ={<HomePage/>}></Route>

        <Route path='/' element={<HomePage/>}></Route>
         <Route path='/cart' element={<Cart/>}></Route>
         <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route>
        <Route path='/product/:productId' element={<ProductDetails/>}></Route>
        <Route path='/checkout' element={<CheckOut/>}></Route>
        <Route path='/account/order' element={<Order/>}></Route>
        <Route path='/account/order/:orderId' element={<OrderDetail/>}></Route>






        {/* <Product/> */}
        {/* <ProductDetails/> */}
        {/* <Cart/> */}
        {/* <CheckOut/> */}
        {/* <Order/> */}
        {/* <OrderDetail/> */}
        

      </Routes>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default CustomerRouters
