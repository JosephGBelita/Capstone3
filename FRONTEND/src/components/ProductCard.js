import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Helper function to check if user is logged in
const isLoggedIn = () => {
  return !!localStorage.getItem('userToken'); // Example: check token presence
};

export default function ProductCard({ productProp }) {
  const { _id, name, description, price } = productProp;
  const navigate = useNavigate();

  // Handle details click
  const handleDetailsClick = () => {
    if (isLoggedIn()) {
      navigate('/add-to-cart', { state: { product: productProp } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="col-md-4 mb-4"> {/* Ensures 3 cards per row */}
      <Card className="h-100">
        <Card.Body>
          <Card.Title
            className="text-primary clickable-title"
            onClick={handleDetailsClick}
            style={{ cursor: 'pointer' }}
          >
            {name}
          </Card.Title>
          <Card.Subtitle className="mb-2">Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle className="mb-2">Price:</Card.Subtitle>
          <Card.Text className="text-warning">₱{price}</Card.Text>
          <hr />
          <button
            className="btn btn-primary w-100"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

// Define prop types for ProductCard
ProductCard.propTypes = {
  productProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
