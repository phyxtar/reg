import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
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
            The best offer <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>
              for your business
            </span>
          </h1>

          <p className='px-3 mb-5' style={{ color: 'hsl(218, 81%, 85%)' }}>
            This is restricted area! If you think you do not belong to this
            place then please jump out 😀
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
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
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
                  placeholder='Enter Password'
                  id='form4'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn className='w-100 mb-4' size='md' type='submit'>
                  Login
                </MDBBtn>

                <div className='text-center'>
                  <p>or sign up with:</p>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='mx-3'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='facebook-f' size='sm' />
                  </MDBBtn>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='mx-3'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='twitter' size='sm' />
                  </MDBBtn>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='mx-3'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='google' size='sm' />
                  </MDBBtn>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='mx-3'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='github' size='sm' />
                  </MDBBtn>
                  <Row className='py-3'>
                    <Col>
                      New To Bazaar ?{' '}
                      <Link
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : '/register'
                        }
                      >
                        Register
                      </Link>
                    </Col>
                  </Row>
                </div>
              </MDBCardBody>
            </MDBCard>
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginScreen;
