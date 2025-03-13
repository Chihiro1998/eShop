import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/Layout.jsx";
import AuthLayout from "./components/auth/Layout.jsx";
import ShopLayout from "./components/shop/Layout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ShopAccount from "./pages/shop/Account.jsx";
import ShopCart from "./pages/shop/Cart.jsx";
import ShopCheckout from "./pages/shop/Checkout.jsx";
import Home from "./pages/shop/Home.jsx";
import Product from "./pages/shop/Product.jsx";

function App() {
  // const isAuthenticated = false
  // const user = null
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

          <Route path="/" element={<ShopLayout />}>
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
  );
}

export default App;
