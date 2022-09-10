import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Josh Gate',
    email: 'josh@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Jhon Doe',
    email: 'jhon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Red Mishentrop',
    email: 'red@example.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Brad Travesy',
    email: 'brad@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
