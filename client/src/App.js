import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import CategoryProject from './pages/CategoryProject';
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<Categories/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/category/:slug" element={<CategoryProject/>} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<DashBoard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders/>} />
        <Route path="admin/update-product/:slug" element={<UpdateProduct/>} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
