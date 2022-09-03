import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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

        <Card.Text as='div'>
          <p>{shop.category}</p>
        </Card.Text>

        <Card.Text as='h6'>{shop.address}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Shop;
