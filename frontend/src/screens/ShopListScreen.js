import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Table, Button, Container, Badge, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { listShop, deleteShop, createShop } from '../actions/shopActions';
import { SHOP_CREATE_RESET } from '../constant/shopConstant';

const ShopListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(listShop());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdShop]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteShop(id));
    }
  };

  const createShopHandler = () => {
    dispatch(createShop());
  };

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <h1>Registered shops</h1>
          </Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createShopHandler}>
              <i className='fas fa-plus'></i> Create Shop
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>SHOP ID</th>
                <th>SHOP NAME</th>
                <th>SHOP EMAIL</th>
                <th>SHOP CATEGORY</th>
                <th>SHOP OWNER</th>
                <th>ADDED BY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop._id}>
                  <td>{shop._id}</td>
                  <td>{shop.name}</td>
                  <td>
                    <a href={`mailto:${shop.email}`} className='email-text'>
                      {shop.email}
                    </a>{' '}
                  </td>
                  <td>{shop.category}</td>
                  <td>{shop.owner_name}</td>
                  <td>{shop.exename}</td>
                  <td>
                    <LinkContainer to={`/admin/shop/${shop._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(shop._id)}
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default ShopListScreen;
