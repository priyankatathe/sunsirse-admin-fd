import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './routes/AdminLayout'
import Dashboard from './Pages/Dashboard'
import TotalUser from './Pages/TotalUser'
import Product from './Pages/Product'
import OrderManagement from './Pages/OrderManagement'
import Categories from './Pages/Categories'
import Transactions from './Pages/Transactions'

const App = () => {
  return <>
   <HashRouter>
        <Routes>
          <Route path='/' element={<AdminLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path='total-user' element={<TotalUser />} />
          <Route path='product' element={<Product />} />
          <Route path='order-management' element={<OrderManagement />} />
          <Route path='categories' element={<Categories />} />
          <Route path='transactions' element={<Transactions />} />
          </Route>
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </HashRouter>
  </>
}

export default App