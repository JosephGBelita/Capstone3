import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function AddProduct() {
    const notyf = new Notyf();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name,
                description,
                price
            })
        })
        .then(res => res.json())
        .then(data => {
            setIsSubmitting(false);
            if (data.success) {
                notyf.success('Product added successfully!');
                setName('');
                setDescription('');
                setPrice(0);
            } else {
                notyf.error(data.error || 'Failed to add product.');
            }
        })
        .catch(error => {
            setIsSubmitting(false);
            notyf.error('Internal Server Error. Please try again later.');
        });
    };

    return (
        <Container className="mt-5 p-5 bg-primary text-white">
            <Row>
                <Col className="p-5 bg-primary text-white">
                    <h1 className="my-5">Add Product</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProductName" className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductPrice" className="mb-4">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding Product...' : 'Add Product'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
