import React, { useState, useEffect } from 'react';
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

const FinalScreen = () => {
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
      navigate('/');
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
      {/* <Link to='/admin/shoplist' className='btn btn-light my-3'>
        Go Back
      </Link> */}
      <div className='text-center'>
        <img
          alt='Congrat'
          className='congrat'
          src={require('../img/congrat.gif')}
        />
      </div>
      <div>
        <img
          alt='Congrat'
          className='congrat'
          src={require('../img/congrat.gif')}
        />
      </div>

      <MDBContainer
        fluid
        className='p-4 background-radial-gradient overflow-hidden'
      >
        <MDBRow>
          <MDBCol
            md='9'
            className='position-relative'
            style={{
              textAlign: 'center',
            }}
          >
            <Message>
              <p>
                Thanks For Registering With Us 😊,We Will Get Back To You
                Shortly...
              </p>
              <p>One Of Our Representative Will Get Touch With You Soon...</p>
            </Message>
          </MDBCol>
          <MDBCol md='3' className='position-relative'>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <MDBCard className=' bg-glass'>
                  <MDBCardBody className='p-5'>
                    <MDBCheckbox
                      wrapperClass='mb-4'
                      id='form3'
                      label='is Paid ?'
                      type='checkbox'
                      checked={isPaid}
                      onChange={(e) => setIspaid(e.target.checked)}
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

export default FinalScreen;