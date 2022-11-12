import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Nav, Container, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo]);

  return (
    <Container>
      <h1>Paid Shop's</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>APPROVED BY LEGAL</th>
              <th className='text-center'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{new Date(order.createdAt).toDateString()}</td>
                <td>Rs.{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    new Date(order.createdAt).toDateString()
                  ) : (
                    <Badge pill bg='danger'>
                      Not Paid
                    </Badge>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    new Date(order.createdAt).toDateString()
                  ) : (
                    <Badge pill bg='warning'>
                      No Actions
                    </Badge>
                  )}
                </td>

                <td>
                  <div className='d-flex'>
                    <Nav.Link as={Link} to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </Nav.Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderListScreen;
