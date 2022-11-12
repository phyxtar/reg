import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Table, Button, Container, Badge, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { listShops, deleteShop, createShop } from '../actions/shopActions';
import { SHOP_CREATE_RESET } from '../constants/shopConstant';

const HomeScreen = () => {
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

    // if (!userInfo.isAdmin) {
    //   navigate('/login');
    // }

    if (successCreate) {
      navigate(`/admin/shop/${createdShop._id}/edit`);
    } else {
      dispatch(listShops());
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
          <Col md={12} className='text-center'>
            <h1 className='heading'>
              Welcome to <span className='bazaar text-red'>Bazaar.com</span>
            </h1>
            <strong>Har Bussiness Bada Hai!!! Bazaar.com Ke Sath</strong>
          </Col>
          <Col md={12} className='text-center'>
            <Button className='my-3 custom' onClick={createShopHandler}>
              <i className='fas fa-plus'></i> Add Shop To Bazaar.com
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
          <></>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
