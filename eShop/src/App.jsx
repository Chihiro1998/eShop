import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/shop/Product"
import ShopCheckout from "./pages/shop/Checkout"
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/shop/Home";
import ShopLayout from "./components/shop/Layout.jsx";
import ShopCart from "./pages/shop/Cart.jsx";
import ShopAccount from "./pages/shop/Account.jsx";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<ShopLayout />} >
            <Route path="/" element={<Home />} />
            {/*<Route path="/electronics" element={<ProductCategory category = "electronics" />} />*/}
            {/*<Route path="/clothes" element={<ProductCategory category = "clothes" />}/>*/}
            {/*<Route path="/books" element={<ProductCategory category = "books" />} />*/}
            <Route path="/product" element={<Product />} />
            <Route path="/cart/checkout" element={<ShopCheckout />} />
            <Route path="/cart" element={<ShopCart />} />
            <Route path="/account" element={<ShopAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
