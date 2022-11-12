import React, { useEffect } from 'react';
import displayRazorPay from '../Utills/PaymentGateway';
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  deliverOrder,
  payOrder,
} from '../actions/orderActions';
import {
  ORDER_DELIVERED_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstant';

const OrderScreen = () => {
  const { id } = useParams();
  const orderId = id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');

      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      document.body.appendChild(script);

      script.onerror = () => {
        alert('Razorpay SDK failed to load. Are you online?');
        resolve(false);
      };
    });
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!order || order._id !== orderId || successDeliver || successPay) {
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch, successDeliver, successPay]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const payHandler = () => {
    dispatch(payOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                {' '}
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Approved on {new Date(order.createdAt).toDateString()}
                </Message>
              ) : (
                <Message variant='danger'>
                  Not Approved Yet By Legal Team (Document Verification
                  Pending)!!!
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid On {new Date(order.createdAt).toDateString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid Yet!!!</Message>
              )}
            </ListGroup.Item>
            {userInfo.isAdmin && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={payHandler}
                >
                  Click To Mark As Paid!
                </Button>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/shop/${item.shop}`}>{item.name}</Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* <Row>
                  <Col>Items</Col>
                  <Col>Rs. {order.itemsPrice}</Col>
                </Row> */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs. {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs. {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' onClick={displayRazorPay}>
                  Click to pay
                </Button>
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Approved!
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
