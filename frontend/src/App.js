import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomScreen from './Screens/HomScreen';
import ShopScreen from './Screens/ShopScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ShopListScreen from './Screens/ShopListScreen';
import ShopEditScreen from './Screens/ShopEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route path='/' element={<HomScreen />} exact />
          <Route path='/shop/:id' element={<ShopScreen />} exact />
          <Route path='/cart/:id' element={<CartScreen />} exact />
          <Route path='/cart' element={<CartScreen />} exact />
          <Route path='/login' element={<LoginScreen />} exact />
          <Route path='/register' element={<RegisterScreen />} exact />
          <Route path='/profile' element={<ProfileScreen />} exact />
          <Route path='/shipping' element={<ShippingScreen />} exact />
          <Route path='/payment' element={<PaymentScreen />} exact />
          <Route path='/placeorder' element={<PlaceOrderScreen />} exact />
          <Route path='/order/:id' element={<OrderScreen />} exact />
          <Route path='admin/userlist' element={<UserListScreen />} exact />
          <Route path='admin/shoplist' element={<ShopListScreen />} exact />
          <Route path='/admin/orderlist' element={<OrderListScreen />} exact />
          <Route
            path='admin/user/:id/edit'
            element={<UserEditScreen />}
            exact
          />
          <Route
            path='admin/shop/:id/edit'
            element={<ShopEditScreen />}
            exact
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
