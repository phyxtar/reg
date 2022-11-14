import axios from 'axios';

export default async function displayRazorPay() {
  // simple post thr node.js server

  const data = await fetch('/razorpay', {
    method: 'POST',
  }).then((t) => t.json());

  console.log(data);

  // options

  const options = {
    key: 'rzp_test_zMS9I7prWhZhsi',
    currency: data.currency,
    amount: data.amount,
    description: 'Wallet Transaction',
    order_id: data.id,
    handler: function (response) {
      alert('PAYMENT ID:' + response.razorpay_payment_id);
      alert('ORDER ID:' + response.razorpay_order_id);
      alert('Payment Suceessfull');
    },
    prefill: {
      //fill out the details
      name: 'Bazaar.com',
      email: 'info@m-bazaar.com',
      contact: '1111111111',
    },
  };

  // display the window on button click

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
}
