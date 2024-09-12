import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import ProductCard from '../components/ProductCard'; // Updated to ProductCard
import UserView from '../components/UserView';
import UserContext from '../context/UserContext';

export default function Products() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]); // Updated to products

    const fetchData = () => {
        const fetchUrl = user.isAdmin
            ? `${process.env.REACT_APP_API_URL}/products/all` // Updated to products
            : `${process.env.REACT_APP_API_URL}/products/`; // Updated to products

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setProducts(data)) // Updated to setProducts
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return user.isAdmin
        ? <AdminView productsData={products} fetchData={fetchData} /> // Updated to productsData
        : <UserView productsData={products} />; // Updated to productsData
}
