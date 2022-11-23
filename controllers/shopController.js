import asyncHandler from 'express-async-handler';
import Shop from '../models/shopModel.js';

const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});

  res.json(shops);
});

const getShopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error('Shop Not Found');
  }
});
const deleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    await shop.remove();
    res.json({ message: 'Shop removed' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

const createShop = asyncHandler(async (req, res) => {
  const shop = new Shop({
    name: 'Sample Shop name',
    image: '/images/sample.jpg',
    category: 'Sample category',
    email: 'Sample Email',
    mobile: 123456789,
    address: 'Jamshedur, Jharkhand',
    owner_name: 'Owner Name',
    owner_mobile: 1234567890,
    trade_lic: 'images/sample2.jpg',
    MISE_certificates: 'images/sample3.jpg',
    pan_card: 'images/sample4.jpg',
    bank_name: 'Bank Name',
    account_number: '1234567890',
    ifcs_number: 'Ifcs Number',
    exename: 'Executive Name',
    price: 1198,
    user: req.user._id,
  });

  const createdShop = await shop.save();
  res.status(201).json(createdShop);
});

const updateShop = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    email,
    mobile,
    address,
    owner_name,
    owner_mobile,
    trade_lic,
    MISE_certificates,
    pan_card,
    bank_name,
    account_number,
    ifcs_number,
    exename,
    price,
  } = req.body;

  const shop = await Shop.findById(req.params.id);

  if (shop) {
    shop.name = name;
    shop.image = image;
    shop.category = category;
    shop.email = email;
    shop.mobile = mobile;
    shop.address = address;
    shop.owner_name = owner_name;
    shop.owner_mobile = owner_mobile;
    shop.trade_lic = trade_lic;
    shop.MISE_certificates = MISE_certificates;
    shop.pan_card = pan_card;
    shop.bank_name = bank_name;
    shop.account_number = account_number;
    shop.ifcs_number = ifcs_number;
    shop.exename = exename;
    shop.price = price;

    const updatedShop = await shop.save();
    res.json(updatedShop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

export { getShops, getShopById, deleteShop, createShop, updateShop };
