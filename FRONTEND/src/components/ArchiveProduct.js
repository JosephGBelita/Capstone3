import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function ArchiveProduct({ product, isActive, fetchData }) {
  const notyf = new Notyf();
  const [productId] = useState(product._id);

  const toggleStatus = (status) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/${status}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          notyf.success(`Successfully ${status === 'archive' ? 'Archived' : 'Activated'}`);
          fetchData(); // Refresh the product list
        } else {
          notyf.error("Something Went Wrong");
        }
      })
      .catch(error => {
        notyf.error("Network error");
        console.error('Error:', error);
      });
  };

  return (
    <>
      {isActive ? (
        <Button variant="danger" size="sm" onClick={() => toggleStatus('archive')}>Archive</Button>
      ) : (
        <Button variant="success" size="sm" onClick={() => toggleStatus('activate')}>Activate</Button>
      )}
    </>
  );
}
