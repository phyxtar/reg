import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Nav, Container, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure! You want to delete this Member?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container>
      <h1>Bazaar Member's</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>isAdmin</th>
              <th>isLegal</th>
              <th className='text-center'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <Badge pill bg='success'>
                      Admin
                    </Badge>
                  ) : (
                    <Badge pill bg='danger'>
                      Executive
                    </Badge>
                  )}
                </td>
                <td>
                  {user.isLegal ? (
                    <Badge pill bg='info'>
                      Legal Team
                    </Badge>
                  ) : (
                    <Badge pill bg='warning'>
                      No Actions
                    </Badge>
                  )}
                </td>

                <td>
                  <div className='d-flex'>
                    <Nav.Link as={Link} to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Nav.Link>
                    <Nav.Link>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Nav.Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;
