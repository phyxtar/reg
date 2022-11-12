import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Shop = ({ shop }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/shop/${shop._id}`}>
        <Card.Img src={shop.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/shop/${shop._id}`}>
          <Card.Title as='div'>
            <strong>{shop.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as='div'>
        <div className='my-3'>{shop.category}</div>
      </Card.Text>

      <Card.Text as='div'>
        <div className='my-3'>{shop.email}</div>
      </Card.Text>
      <Card.Text as='div'>
        <div className='my-3'>{shop.mobile}</div>
      </Card.Text>
    </Card>
  );
};

export default Shop;
