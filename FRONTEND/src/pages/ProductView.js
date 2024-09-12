import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function ProductView() {
    const notyf = new Notyf();
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const enroll = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                enrolledProducts: [{ productId }],
                totalPrice: price
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Admin is forbidden') {
                notyf.error("Admin Forbidden");
            } else if (data.message === 'Enrolled successfully') {
                notyf.success("Enrollment Successful");
                navigate("/products");
            } else {
                notyf.error("Internal Server Error. Notify System Admin.");
            }
        });
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/specific/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
            })
            .catch(error => {
                notyf.error('Internal Server Error. Please try again later.');
            });
    }, [productId]);

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <Card.Subtitle>Class Schedule</Card.Subtitle>
                            <Card.Text>8 am - 5 pm</Card.Text>
                            {user.id !== null ? (
                                <Button variant="primary" block="true" onClick={() => enroll(productId)}>Enroll</Button>
                            ) : (
                                <Link className="btn btn-danger" to="/login">Login to Enroll</Link>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
