import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listShopDetails } from '../actions/shopActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ShopScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const shopDetails = useSelector((state) => state.shopDetails);
  const { loading, error, shop } = shopDetails;

  useEffect(() => {
    dispatch(listShopDetails(id));
  }, [id, dispatch]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
                <strong>Owner: {shop.owner_name}</strong>
              </ListGroup.Item>
              <ListGroup.Item>Category: {shop.category}</ListGroup.Item>
              <ListGroup.Item>Email: {shop.email}</ListGroup.Item>
              <ListGroup.Item>Address: {shop.address}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ShopScreen;
