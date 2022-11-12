import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';

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
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/userConstant';

const UserEditScreen = () => {
  const { id } = useParams();
  const userId = id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLegal, setIsLegal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsLegal(user.isLegal);
      }
    }
  }, [dispatch, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isLegal }));
  };

  return (
    <>
      <MDBContainer
        fluid
        className='p-4 background-radial-gradient overflow-hidden'
      >
        <Link to='/admin/userlist' clasName='btn btn-light my-3'>
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
              Edit <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>
                Member's Details
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
                      placeholder='Enter Your Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      id='form3'
                      type='email'
                      placeholder='email@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBCheckbox
                      wrapperClass='mb-4'
                      id='form3'
                      label='Want To Make This Member as Admin ?'
                      type='checkbox'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />

                    <MDBCheckbox
                      wrapperClass='mb-4'
                      id='form3'
                      label='Want To Make This Member as Legal ?'
                      type='checkbox'
                      checked={isLegal}
                      onChange={(e) => setIsLegal(e.target.checked)}
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

export default UserEditScreen;
