import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import UserContext from '../context/UserContext';

export default function CartView() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (user.id) {
            fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data && data.cart) {
                    setCartItems(data.cart);
                    const total = data.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    setTotalPrice(total);
                } else {
                    notyf.error(data.error || "Failed to load cart items.");
                }
            })
            .catch(error => {
                notyf.error('Internal Server Error. Please try again later.');
            });
        }
    }, [user]);

    const handleCheckout = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                cartItems
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                notyf.success('Checkout successful!');
                setCartItems([]);
                setTotalPrice(0);
            } else {
                notyf.error(data.error || 'Failed to complete checkout.');
            }
        })
        .catch(error => {
            notyf.error('Internal Server Error. Please try again later.');
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="my-4">Cart View</h1>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map(item => (
                                <Card key={item.productId} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Price: ₱{item.price}</Card.Subtitle>
                                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                            <h3 className="mt-4">Total Price: ₱{totalPrice}</h3>
                            <Button variant="primary" onClick={handleCheckout} className="mt-3">
                                Checkout
                            </Button>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
