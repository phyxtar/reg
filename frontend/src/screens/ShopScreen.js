import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Badge,
  Form,
  Container,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { listShopDetails } from '../actions/shopActions';

const ShopScreen = ({ history }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const shopDetails = useSelector((state) => state.shopDetails);
  const { loading, error, shop } = shopDetails;

  useEffect(() => {
    dispatch(listShopDetails(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    //history.push(`/cart/${id}?qty=${qty}`);
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image src={shop.image} alt={shop.name} flush />
          </Col>

          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{shop.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Owner:</strong> {shop.owner_name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Owner mobile No.:</strong> {shop.owner_mobile}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Category:</strong> {shop.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {shop.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mobile No.:</strong> {shop.mobile}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Address:</strong> {shop.address}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Shop Added By (Executive): </strong>{' '}
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
              Required Documents of the Registered Shop*
            </h6>

            <Col md>
              <strong>Trade Lic :</strong>
              <Image src={shop.trade_lic} alt='Trade Lic' fluid />
            </Col>
            <Col md>
              <strong>MSME Certificates :</strong>
              <Image src={shop.MISE_certificates} alt='MSME' fluid />
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
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                {/* <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${shop.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item> */}
                {shop.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(shop.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    onClick={addToCartHandler}
                    disabled={shop.countInStock === 0}
                  >
                    Pay to Bazaar
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ShopScreen;
