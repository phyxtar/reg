import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { SHOP_UPDATE_RESET } from '../constant/shopConstant';

import { Navigate, useParams } from 'react-router-dom';
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

const LegalScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const shopId = id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [owner_name, setOwnerName] = useState('');
  const [owner_mobile, setOwnerMobile] = useState('');
  const [exename, setExename] = useState('');
  const [price, setPrice] = useState('');
  const [price2, setPrice2] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [uploading3, setUploading3] = useState(false);
  const [uploading4, setUploading4] = useState(false);
  //const [uploading5, setUploading5] = useState(false);
  const [trade_lic, setTradeLic] = useState('');
  const [pan_card, setPanCard] = useState('');
  const [MISE_certificates, setMise] = useState('');
  const [account_number, setAccount] = useState('');
  const [bank_name, setBankname] = useState('');
  const [ifcs_number, setIfcs] = useState('');
  const [isPaid, setIspaid] = useState(false);
  const [isApproved, setIsapproved] = useState(false);
  const dispatch = useDispatch();

  const shopDetails = useSelector((state) => state.shopDetails);
  const { loading, error, shop } = shopDetails;

  const shopUpdate = useSelector((state) => state.shopUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopUpdate;

  useEffect(() => {
    dispatch(listShopDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SHOP_UPDATE_RESET });
      navigate('/admin/shoplist');
      //navigate(`/welcome/shop/${shop._id}/edit`);
    } else {
      if (!shop.name || shop._id !== shopId) {
        dispatch(listShopDetails(shopId));
      } else {
        setName(shop.name);
        setImage(shop.image);
        setCategory(shop.category);
        setEmail(shop.email);
        setMobile(shop.mobile);
        setAddress(shop.address);
        setOwnerName(shop.owner_name);
        setOwnerMobile(shop.owner_mobile);
        setTradeLic(shop.trade_lic);
        setPanCard(shop.pan_card);
        setMise(shop.MISE_certificates);
        setBankname(shop.bank_name);
        setAccount(shop.account_number);
        setIfcs(shop.ifcs_number);
        setExename(shop.exename);
        setPrice(shop.price);
        setPrice2(shop.price2);

        setIspaid(shop.isPaid);
        setIsapproved(shop.isApproved);
      }
    }
  }, [shop, shopId, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateShop({
        _id: shopId,
        name,
        image,
        category,
        email,
        mobile,
        address,
        owner_name,
        owner_mobile,
        trade_lic,
        pan_card,
        MISE_certificates,
        bank_name,
        account_number,
        ifcs_number,
        exename,
        price,
        price2,
        isPaid,
        isApproved,
      })
    );
    //navigate(`/shop/${shop._id}`);
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

      <MDBContainer fluid className='p-4 ali'>
        <MDBRow>
          <MDBCol md='8' className='position-relative'>
            <hr />
            <p style={{ color: 'red' }}>
              The Below Section Is Only For The Legal Team *{' '}
            </p>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <MDBCard className='my-5 bg-glass'>
                  <MDBCardBody className='p-5'>
                    <MDBCheckbox
                      wrapperClass='mb-4'
                      id='form3'
                      label='Mark As Approved ?'
                      type='checkbox'
                      checked={isApproved}
                      onChange={(e) => setIsapproved(e.target.checked)}
                    />

                    <hr />
                    <MDBBtn className='w-100 mb-4' size='md' type='submit'>
                      Update
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </Form>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default LegalScreen;
