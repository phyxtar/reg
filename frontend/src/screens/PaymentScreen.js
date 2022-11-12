import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('RazorPay');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='RazorPay or Credit Card'
              id='RazorPay'
              name='paymentMethod'
              value='RazorPay'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' className='mt-3' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
