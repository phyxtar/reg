import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ShopListScreen from './screens/ShopListScreen';
import ShopEditScreen from './screens/ShopEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
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
