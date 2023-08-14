import {Routes, Route, Navigate} from 'react-router-dom';
import { useAuth } from './context/Auth';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRouteProtect from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryItems from './pages/CategoryItems';
import CartPage from './pages/CartPage';
import ThankYou from './pages/ThankYou';
import WishlistPage from './pages/WishlistPage';

function App() {
  const {auth} = useAuth()
  const isUserAuthenticated=()=>{
    if(auth?.user){
      return true
    }
    else{
      return false
    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/:slug" element={<CategoryItems/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/wishlist" element={<WishlistPage/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/signup" element={isUserAuthenticated() ? <Navigate to="/" /> : <SignUp />} />
        {/* On going to the /dashboard route we check the PrivateRoute element */}
        {/* The PrivateRoute element checks for the conditions and then decides to show the element for the requested path or the spinner */}
        <Route path="/thankyou" element={<ThankYou/>} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile/>} />
          <Route path="user/orders" element={<Orders/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRouteProtect/>}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/products" element={<Products/>} />
        </Route>
        <Route path="/login" element={isUserAuthenticated() ? <Navigate to="/" /> : <Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
