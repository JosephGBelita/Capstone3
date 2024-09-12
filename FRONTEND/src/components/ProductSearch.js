import React, { useState } from 'react'; 
import ProductCard from './ProductCard'; // Updated to ProductCard
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

const ProductSearch = () => { // Updated to ProductSearch
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Sample product data for demonstration purposes (this should come from your API)
  const products = [ // Updated to products
    { _id: 1, name: 'React Basics', description: 'Learn the basics of React.', price: 500 },
    { _id: 2, name: 'Advanced React', description: 'Take your React skills to the next level.', price: 1500 },
    { _id: 3, name: 'JavaScript Essentials', description: 'Master JavaScript from scratch.', price: 1000 },
  ];

  const handleSearchByName = () => {
    if (searchQuery.trim() === '') {
      // If searchQuery is empty, do not filter the results
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setSearchResults(filteredProducts);
  };

  const handleSearchByPrice = () => {
    if (minPrice.trim() === '' && maxPrice.trim() === '') {
      // If both minPrice and maxPrice are empty, do not filter the results
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter(product => 
      (!minPrice || product.price >= parseFloat(minPrice)) && // Updated to product
      (!maxPrice || product.price <= parseFloat(maxPrice)) 
    );
    setSearchResults(filteredProducts);
  };

  const handleClear = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSearchResults([]);
  };

  return (
    <div className="container mt-4">
      <h2>Product Search</h2> 

      {/* Search Input for Product Name */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="productName">Product Name:</Form.Label> 
        <Form.Control
          type="text"
          id="productName"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Enter product name"
        />
      </Form.Group>

      {/* Minimum Price Input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="minPrice">Minimum Price:</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Enter minimum price"
          />
        </InputGroup>
      </Form.Group>

      {/* Maximum Price Input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="maxPrice">Maximum Price:</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Enter maximum price"
          />
        </InputGroup>
      </Form.Group>

      {/* Buttons with Spacing */}
      <div className="mb-3">
        <Button className="me-2" variant="primary" onClick={handleSearchByName}>
          Search by Name
        </Button>
        <Button className="me-2" variant="info" onClick={handleSearchByPrice}>
          Search by Price
        </Button>
        <Button variant="danger" onClick={handleClear}>
          Clear
        </Button>
      </div>

      {/* Line separating search results and product cards */}
      <hr />

      <h3>Search Results:</h3>

      {/* Line below the text to separate from ProductCard */}
      <hr />

      {/* Product Cards displayed in rows of 3 */}
      <Row>
        {searchResults.map((product) => ( 
          <Col md={4} key={product._id}> 
            <ProductCard productProp={product} /> // Updated to ProductCard and productProp
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductSearch; // Updated to ProductSearch
