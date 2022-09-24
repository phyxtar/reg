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
    throw new Error('Product Not Found');
  }
});

const deleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    await shop.remove();
    res.json({ message: 'Shop Removed' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

const createShop = asyncHandler(async (req, res) => {
  const shop = new Shop({
    name: 'Sample name',
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
    bank_details: 'images/sample5.jpg',
    exename: 'Executive Name',
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
    pan_card,
    MISE_certificates,
    bank_details,
    exename,
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
    shop.pan_card = pan_card;
    shop.MISE_certificates = MISE_certificates;
    shop.bank_details = bank_details;
    shop.exename = exename;

    const updatedShop = await shop.save();
    res.json(updatedShop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

export { getShops, getShopById, deleteShop, createShop, updateShop };
