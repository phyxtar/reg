import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constant/userConstant';
import { useParams } from 'react-router-dom';
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

const UserEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = id;

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
      }
    }
  }, [user, userId, dispatch, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
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
              Update Member's <br />
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
                      id='form3'
                      type='email'
                      placeholder='email@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <MDBCheckbox
                      wrapperClass='mb-4'
                      id='form3'
                      label='Want To Make Admin ?'
                      type='checkbox'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />

                    <MDBBtn className='w-100 mb-4' size='md' type='submit'>
                      Update
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
                    </div>
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
