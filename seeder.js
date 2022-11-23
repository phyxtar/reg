import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import shops from './data/shops.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import Shop from './models/shopModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Shop.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleShops = shops.map((shop) => {
      return { ...shop, user: adminUser };
    });

    await Shop.insertMany(sampleShops);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);

    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Shop.deleteMany();
    await User.deleteMany();

    console.log('Data Destroy!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);

    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
