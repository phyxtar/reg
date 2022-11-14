import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { listShopDetails, updateShop } from '../actions/shopActions';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBFile,
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { SHOP_UPDATE_RESET } from '../constants/shopConstant';

const ShopEditScreen = () => {
  const { id } = useParams();
  const shopId = id;

  const [qty, setQty] = useState(1);
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
  const [uploading, setUploading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [uploading3, setUploading3] = useState(false);
  const [trade_lic, setTradeLic] = useState('');
  const [pan_card, setPanCard] = useState('');
  const [MISE_certificates, setMise] = useState('');
  const [account_number, setAccount] = useState('');
  const [bank_name, setBankname] = useState('');
  const [ifcs_number, setIfcs] = useState('');

  const navigate = useNavigate();
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
    if (successUpdate) {
      dispatch({ type: SHOP_UPDATE_RESET });
      navigate('/admin/shoplist');
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
      }
    }
  }, [dispatch, shopId, shop, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler1 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('trade_lic', file);
    setUploading1(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload1', formData, config);

      setTradeLic(data);
      setUploading1(false);
    } catch (error) {
      console.error(error);
      setUploading1();
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('pan_card', file);
    setUploading2(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload2', formData, config);

      setPanCard(data);
      setUploading2(false);
    } catch (error) {
      console.error(error);
      setUploading2();
    }
  };

  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('MISE_certificates', file);
    setUploading3(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload3', formData, config);

      setMise(data);
      setUploading3(false);
    } catch (error) {
      console.error(error);
      setUploading3();
    }
  };

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
      })
    );
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <MDBContainer
        fluid
        className='p-4 background-radial-gradient overflow-hidden'
      >
        <Link to='/admin/shoplist' clasName='btn btn-light my-3'>
          Go Back
        </Link>
        <MDBRow>
          <MDBCol
            md='6'
            className='text-center text-md-start d-flex flex-column justify-content-center'
          >
            <h1
              className='my-5 display-3 fw-bold ls-tight px-3'
              style={{ color: 'hsl(218, 81%, 95%)' }}
            >
              Edit Registered
              <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>
                Shop's Details
              </span>
            </h1>

            <p
              className='px-3 mb-5'
              style={{ color: 'hsl(218, 81%, 85%)', fontSize: '20px' }}
            >
              Join our group in few minutes! Sign up with your details to get
              started...☺
            </p>
          </MDBCol>

          <MDBCol md='6' className='position-relative'>
            <div
              id='radius-shape-1'
              className='position-absolute rounded-circle shadow-5-strong'
            ></div>
            <div
              id='radius-shape-2'
              className='position-absolute shadow-5-strong'
            ></div>
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
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Shop image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <MDBFile
                      wrapperClass='mb-4'
                      id='customFile'
                      label='OR Upload Image'
                      custom
                      onChange={uploadFileHandler}
                    />
                    {uploading && <Loader />}
                    <MDBInput
                      wrapperClass='mb-4 mt-4'
                      id='form3'
                      type='text'
                      placeholder='Enter Category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='email'
                      placeholder='email@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='number'
                      placeholder='Enter Mobile Number'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='textarea'
                      placeholder='Enter Address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='text'
                      placeholder='Owner Name'
                      value={owner_name}
                      onChange={(e) => setOwnerName(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='number'
                      placeholder='Owner Mobile Number'
                      value={owner_mobile}
                      onChange={(e) => setOwnerMobile(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='text'
                      placeholder='Executive Name'
                      value={exename}
                      onChange={(e) => setExename(e.target.value)}
                      required
                    />
                    <MDBInput
                      label='Starter plan (199) + Monthly Services Plan & Fees(Worth Rs. 999 Only)'
                      wrapperClass='mb-4'
                      id='form3'
                      type='number'
                      placeholder='Starter Plan'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <strong>
                      The below document is required for become a member of
                      Bazaar.com
                    </strong>{' '}
                    <br />
                    <hr />
                    <p style={{ fontWeight: 700, color: 'red' }}>
                      Trade Lic :{' '}
                    </p>
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Trade Lic Url'
                      value={trade_lic}
                      onChange={(e) => setTradeLic(e.target.value)}
                    />
                    <MDBFile
                      wrapperClass='mb-4'
                      id='customFile'
                      label='OR Upload Image'
                      custom
                      onChange={uploadFileHandler1}
                    />
                    {uploading1 && <Loader />}
                    <hr />
                    <hr />
                    <p style={{ fontWeight: 700, color: 'red' }}>PAN Card : </p>
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter PAN Card Url'
                      value={pan_card}
                      onChange={(e) => setPanCard(e.target.value)}
                    />
                    <MDBFile
                      wrapperClass='mb-4'
                      id='customFile'
                      label='OR Upload Image'
                      custom
                      onChange={uploadFileHandler2}
                    />
                    {uploading2 && <Loader />}
                    <hr />
                    <hr />
                    <p style={{ fontWeight: 700, color: 'red' }}>
                      MSME Certificate :{' '}
                    </p>
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Url'
                      value={MISE_certificates}
                      onChange={(e) => setMise(e.target.value)}
                    />
                    <MDBFile
                      wrapperClass='mb-4'
                      id='customFile'
                      label='OR Upload Image'
                      custom
                      onChange={uploadFileHandler3}
                    />
                    {uploading3 && <Loader />}
                    <hr />
                    <hr />
                    <p style={{ fontWeight: 700, color: 'red' }}>
                      Bank Details :{' '}
                    </p>
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Bank Name'
                      value={bank_name}
                      onChange={(e) => setBankname(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Account Number'
                      value={account_number}
                      onChange={(e) => setAccount(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter IFSC'
                      value={ifcs_number}
                      onChange={(e) => setIfcs(e.target.value)}
                    />
                    <hr />
                    <div class='tacbox'>
                      <input id='checkbox' type='checkbox' />
                      <label for='checkbox' class='px-3'>
                        {' '}
                        I agree to these{' '}
                        <a href='../img/Term.docx' download>
                          Terms and Conditions
                        </a>
                        .
                      </label>
                    </div>
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

export default ShopEditScreen;
