import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ productsData }) {
    const featuredProducts = productsData.filter(product => product.featured === true && product.isActive);

    return (
        <Row>
            {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                    <Col sm={12} md={6} lg={4} key={product._id} className="mb-4">
                        <ProductCard productProp={product} />
                    </Col>
                ))
            ) : (
                <p>No featured products available at the moment.</p>
            )}
        </Row>
    );
}
