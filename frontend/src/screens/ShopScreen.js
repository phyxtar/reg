import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listShopDetails, updateShop } from '../actions/shopActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ShopScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const shopDetails = useSelector((state) => state.shopDetails);
  const { loading, error, shop } = shopDetails;

  useEffect(() => {
    dispatch(listShopDetails(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?`);
    //window.location.href = `/cart/${id}`;
  };

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
                <h3>
                  {shop.name}{' '}
                  <span
                    style={{
                      color: '#6A44BB',
                      fontSize: '17px',
                    }}
                  >
                    ({shop._id})
                  </span>
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Owner:<strong> {shop.owner_name}</strong>
              </ListGroup.Item>
              <ListGroupItem>
                Owner mobile No.: <strong> {shop.owner_mobile}</strong>
              </ListGroupItem>

              <ListGroup.Item>Category: {shop.category}</ListGroup.Item>
              <ListGroup.Item>Email: {shop.email}</ListGroup.Item>
              <ListGroup.Item>Mobile No.: {shop.mobile}</ListGroup.Item>
              <ListGroup.Item>Address: {shop.address}</ListGroup.Item>
              <ListGroup.Item>
                Shop Added By (Executive):{' '}
                <Badge pill bg='info'>
                  {shop.exename}
                </Badge>{' '}
              </ListGroup.Item>
            </ListGroup>

            <h6
              style={{
                color: 'red',
                marginTop: '30px',
                textDecoration: 'underline',
              }}
            >
              Required Documents of the Registered Shop *
            </h6>

            <Col md>
              <strong>Trade Lic :</strong>
              <Image src={shop.trade_lic} alt='Trade Lic' fluid />
            </Col>
            <Col md>
              <strong>MISE Certificates :</strong>
              <Image src={shop.MISE_certificates} alt='MISE' fluid />
            </Col>
            <Col md>
              <strong>Pan Card :</strong>
              <Image src={shop.pan_card} alt='PAN' fluid />
            </Col>
            <Col md>
              <strong>Bank Details :</strong>
              <ListGroup>
                <ListGroup.Item>
                  <span style={{ fontWeight: 'bold' }}>Bank Name:</span>{' '}
                  {shop.bank_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontWeight: 'bold' }}>Bank Account No.:</span>{' '}
                  {shop.account_number}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontWeight: 'bold' }}>Bank IFSC:</span>{' '}
                  {shop.ifcs_number}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ShopScreen;
