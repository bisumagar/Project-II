
import { Route, Routes } from 'react-router-dom'
import AdminRouters from './Routers/AdminRouters'
import CustomerRouters from './Routers/CustomerRouters'

const App = () => {
  return (
    <div className='min-h-screen w-full '>

     
      <Routes>
        <Route path='/*'element={<CustomerRouters/>}></Route>
        <Route path='/admin/*' element={ <AdminRouters/>}></Route>  

      </Routes>
   
    </div>
  )
}

export default App
