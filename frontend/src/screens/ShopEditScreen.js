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
  const [uploading, setUploading] = useState(false);

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
        setExename(shop.exename);
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
        exename,
      })
    );
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
              Edit Shop <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Profile</span>
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
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form2'
                      type='text'
                      placeholder='Enter Your Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='email'
                      placeholder='email@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='number'
                      placeholder='Enter Mobile Number'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='textarea'
                      placeholder='Enter Address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='text'
                      placeholder='Owner Name'
                      value={owner_name}
                      onChange={(e) => setOwnerName(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='number'
                      placeholder='Owner Mobile Number'
                      value={owner_mobile}
                      onChange={(e) => setOwnerMobile(e.target.value)}
                    />

                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='text'
                      placeholder='Executive Name'
                      value={exename}
                      onChange={(e) => setExename(e.target.value)}
                    />

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
