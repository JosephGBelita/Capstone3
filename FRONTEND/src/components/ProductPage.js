import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products/active');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <ProductCard key={product._id} productProp={product} />
        ))}
      </Row>
    </Container>
  );
}
