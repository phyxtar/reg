import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jhon Doe',
    email: 'jhon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Legal Team',
    email: 'legal@example.com',
    password: bcrypt.hashSync('123456', 10),
    isLegal: true,
  },
];

export default users;
