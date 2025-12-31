import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminLayout from './routes/AdminLayout';
import Dashboard from './Pages/Dashboard';
import TotalUser from './Pages/TotalUser';
import Product from './Pages/Product';
import OrderManagement from './Pages/OrderManagement';
import Categories from './Pages/Categories';
import Transactions from './Pages/Transactions';
import LoginAdmin from './Pages/LoginAdmin';
import AdminProtector from './middleware/AdminProtector';
import Coupen from './Pages/Coupen';
import Message from './Pages/Message';

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>

          <Route
            path="/"
            element={
              <AdminProtector>
                <AdminLayout />
              </AdminProtector>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="total-user" element={<TotalUser />} />
            <Route path="product" element={<Product />} />
            <Route path="order-management" element={<OrderManagement />} />
            <Route path="categories" element={<Categories />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="coupens" element={<Coupen />} />
            <Route path="message" element={<Message />} />
          </Route>

          {/* Public Route */}
          <Route path="/login-admin" element={<LoginAdmin />} />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </HashRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
