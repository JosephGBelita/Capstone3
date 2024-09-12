import './App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products'; // Updated to Products
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import ProductView from './pages/ProductView'; // Updated to ProductView
import AddProduct from './pages/AddProduct'; // Updated to AddProduct
import AdminView from './components/AdminView'; // Ensure this path is correct
import AddToCart from './pages/AddToCart';
import CartView from './pages/CartView';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const [productsData, setProductsData] = useState([]); // Updated to productsData

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.access !== undefined) {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`) // Updated to products
      .then(res => res.json())
      .then(data => setProductsData(data))
      .catch(error => console.error('Error fetching products data:', error)); // Updated to products
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} /> {/* Updated to Products */}
            <Route path="/products/:productId" element={<ProductView />} /> {/* Updated to ProductView */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<AdminView productsData={productsData} fetchData={() => {/* Your fetch function */}} />} /> {/* Updated to productsData */}
            <Route path="/add-to-cart" element={<AddToCart />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addProduct" element={<AddProduct />} /> {/* Updated to AddProduct */}
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
