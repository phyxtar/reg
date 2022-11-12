import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Nav,
  Container,
  Badge,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listShops, deleteShop, createShop } from '../actions/shopActions';
import { SHOP_CREATE_RESET } from '../constants/shopConstant';

const ShopListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;

  const shopDelete = useSelector((state) => state.shopDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = shopDelete;

  const shopCreate = useSelector((state) => state.shopCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    shop: createdShop,
  } = shopCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: SHOP_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/shop/${createdShop._id}/edit`);
    } else {
      dispatch(listShops());
    }
  }, [dispatch, userInfo, successDelete, successCreate, createdShop]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure! You want to delete this Shop?')) {
      dispatch(deleteShop(id));
    }
  };

  const createShopHandler = () => {
    dispatch(createShop());
  };

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>Registered Shop's</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createShopHandler}>
            <i className='fas fa-plus'></i> Register Shop
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>DATE</th>
              <th>SHOP NAME</th>
              <th>SHOP EMAIL</th>
              <th>SHOP CATEGORY</th>
              <th>SHOP OWNER</th>
              <th>ADDED BY</th>
              <th className='text-center'>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {shops.map((shop) => (
              <tr key={shop._id}>
                <td>{new Date(shop.createdAt).toDateString()}</td>
                <td>
                  <a href={`/shop/${shop._id}`}> {shop.name}</a>
                </td>
                <td>
                  <a href={`mailto:${shop.email}`} className='email-text'>
                    {shop.email}
                  </a>{' '}
                </td>
                <td>{shop.category}</td>
                <td>{shop.owner_name}</td>
                <td>{shop.exename}</td>

                <td>
                  <Nav.Link as={Link} to={`/admin/shop/${shop._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Nav.Link>
                  <Nav.Link as={Link}>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(shop._id)}
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </Nav.Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ShopListScreen;
