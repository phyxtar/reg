import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import shops from '../shops';

const ShopScreen = ({ match }) => {
  const { id } = useParams();
  const shop = shops.find((s) => s._id === id);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={shop.image} alt={shop.name} fluid />
        </Col>

        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{shop.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Owner: {shop.owner}</strong>
            </ListGroup.Item>
            <ListGroup.Item>Category: {shop.category}</ListGroup.Item>
            <ListGroup.Item>Email: {shop.email}</ListGroup.Item>
            <ListGroup.Item>Address: {shop.address}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ShopScreen;
