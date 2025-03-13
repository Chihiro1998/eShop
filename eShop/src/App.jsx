import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/shop/Product"
import ShopCheckout from "./pages/shop/Checkout"
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import ShopLayout from "./components/shopping/layout";
import ShopHome from "./pages/shop/Home";


function App() {
  return (
    <div>
      <h1>Header component</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/shop" element={<ShopLayout />} >
            <Route path="home" element={<ShopHome />} />
            <Route path="product" element={<Product />} />
            <Route path="checkout" element={<ShopCheckout />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
