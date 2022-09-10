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
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin/userlist' element={<UsersListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/shoplist' element={<ShopListScreen />} />
            <Route path='/admin/shop/:id/edit' element={<ShopEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
