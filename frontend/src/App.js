import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersListScreen from './screens/UsersListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ShopListScreen from './screens/ShopListScreen';
import ShopEditScreen from './screens/ShopEditScreen';
import ShippingScreen from './screens/ShippingScreen';
import FinalScreen from './screens/FinalScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import LegalScreen from './screens/LegalScreen';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container fluid>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/shop/:id' element={<ShopScreen />} />
            {/* <Route path='/cart/:id' element={<CartScreen />} /> */}
            <Route path='/welcome/shop/:id/edit' element={<FinalScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin/userlist' element={<UsersListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/shoplist' element={<ShopListScreen />} />
            <Route path='/admin/shop/:id/edit' element={<ShopEditScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/legal/shop/:id/edit' element={<LegalScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
