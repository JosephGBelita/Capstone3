import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import AddProduct from '../pages/AddProduct';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView() {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const toggleAddProduct = () => setShowAddProduct(!showAddProduct);

    // Function to fetch products
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/active`) // Ensure this is the correct endpoint
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    };

    const updateProductStatus = (productId, isActive) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === productId ? { ...product, isActive } : product
            )
        );
    };

    useEffect(() => {
        fetchData(); // Fetch products on component mount
    }, []);

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>

            <div className="text-center my-3">
                <Button variant="primary" onClick={toggleAddProduct}>Add New Product</Button>{' '}
                <Button variant="success">Show User Orders</Button>
            </div>

            {showAddProduct && <AddProduct fetchData={fetchData} />}

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td className={product.isActive ? "text-success" : "text-danger"}>
                                {product.isActive ? "Available" : "Unavailable"}
                            </td>
                            <td className="text-center">
                                <EditProduct product={product} fetchData={fetchData} />
                                <ArchiveProduct
                                    product={product}
                                    isActive={product.isActive}
                                    fetchData={fetchData}
                                    updateProductStatus={updateProductStatus}
                                />
                            </td>
                        </tr>
                    )) : <tr><td colSpan="5" className="text-center">No Products Available</td></tr>}
                </tbody>
            </Table>
        </>
    );
}
