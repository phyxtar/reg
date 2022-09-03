import React from 'react';
import { Row, Col } from 'react-bootstrap';
import shops from '../shops';
import Shop from '../components/Shop';

const HomeScreen = () => {
  return (
    <>
      <h1>Registered Shops</h1>
      <Row>
        {shops.map((shop) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Shop shop={shop} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
