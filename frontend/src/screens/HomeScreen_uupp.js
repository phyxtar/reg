import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Shop from '../components/Shop';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listShop } from '../actions/shopActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;

  useEffect(() => {
    dispatch(listShop());
  }, [dispatch]);

  return (
    <>
      <h1>Registered Shops</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {shops.map((shop) => (
            <Col key={shop._id} sm={12} md={6} lg={4} xl={3}>
              <Shop shop={shop} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
