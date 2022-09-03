import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Shop from '../components/Shop';
import axios from 'axios';

const HomeScreen = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const { data } = await axios.get('/api/shops');

      setShops(data);
    };

    fetchShops();
  }, []);

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
