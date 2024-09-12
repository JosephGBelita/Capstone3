import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function EditProduct({ product, fetchData }) {
    const notyf = new Notyf();

    const [productId, setProductId] = useState(product._id);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => setShowEdit(true);
    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
    };

    const editProduct = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                notyf.success("Successfully Updated");
                closeEdit();
                fetchData();
            } else {
                notyf.error("Something went wrong");
                closeEdit();
                fetchData();
            }
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={openEdit}>Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={editProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
