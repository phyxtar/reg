import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { listShopDetails, updateShop } from '../actions/shopActions';
import { useParams } from 'react-router-dom';

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

const ShopEditScreen = () => {
  const { id } = useParams();

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shopId = id;

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
      //navigate('/admin/shoplist');
      navigate(`/welcome/shop/${shop._id}/edit`);
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
        setIspaid(shop.isPaid);
      }
    }
  }, [shop, shopId, dispatch, navigate, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading();
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('trade_lic', file);
    setUploading2(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload2', formData, config);

      setTradeLic(data);
      setUploading2(false);
    } catch (error) {
      console.error(error);
      setUploading2();
    }
  };

  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('pan_card', file);
    setUploading3(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload3', formData, config);

      setPanCard(data);
      setUploading3(false);
    } catch (error) {
      console.error(error);
      setUploading3();
    }
  };

  const uploadFileHandler4 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('MISE_certificates', file);
    setUploading4(true);

    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload4', formData, config);

      setMise(data);
      setUploading4(false);
    } catch (error) {
      console.error(error);
      setUploading4();
    }
  };

  // const uploadFileHandler5 = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('bank_details', file);
  //   setUploading5(true);

  //   try {
  //     const config = {
  //       header: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     };

  //     const { data } = await axios.post('/api/upload5', formData, config);

  //     setBank(data);
  //     setUploading5(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading5();
  //   }
  // };

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
        isPaid,
      })
    );
    //navigate(`/shop/${shop._id}`);
  };

  return (
    <>
      <Link to='/admin/shoplist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <MDBContainer
        fluid
        className='p-4 background-radial-gradient overflow-hidden'
      >
        <MDBRow>
          <MDBCol
            md='6'
            className='text-center text-md-start d-flex flex-column justify-content-center'
          >
            <h1
              className='my-5 display-3 fw-bold ls-tight px-3'
              style={{ color: 'hsl(218, 81%, 95%)' }}
            >
              Edit <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Shop</span>
            </h1>
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
                    {/* <MDBCheckbox
                      wrapperClass='mb-4'
                      id='form3'
                      label='is Paid ?'
                      type='checkbox'
                      checked={isPaid}
                      onChange={(e) => setIspaid(e.target.checked)}
                    /> */}
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Your Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter image url'
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
                      wrapperClass='mb-4'
                      id='form3'
                      type='number'
                      placeholder='Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <strong>
                      The below document is required for become a member od
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
                      onChange={uploadFileHandler2}
                    />
                    {uploading2 && <Loader />}
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
                      onChange={uploadFileHandler3}
                    />
                    {uploading3 && <Loader />}
                    <hr />
                    <hr />
                    <p style={{ fontWeight: 700, color: 'red' }}>
                      MISE Certificate :{' '}
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
                      onChange={uploadFileHandler4}
                    />
                    {uploading4 && <Loader />}
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
