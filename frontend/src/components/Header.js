import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='custom' expand='lg' variant='' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img
              alt=''
              src={require('../img/logo.png')}
              style={{
                width: '150px',
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i>My Registration
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user'></i>Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    All Members
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/shoplist'>
                    All Registered Shops
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    All Paid Shop's
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo && userInfo.isLegal && (
                <NavDropdown title='Legal Team' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/shoplist'>
                    All Registered Shops
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    All Orders
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
