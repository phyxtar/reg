import mongoose from 'mongoose';

const shopSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    owner_mobile: {
      type: Number,
      required: true,
    },
    trade_lic: {
      type: String,
      required: true,
    },
    pan_card: {
      type: String,
      required: true,
    },
    MISE_certificates: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: Number,
      required: true,
    },
    ifcs_number: {
      type: String,
      required: true,
    },

    exename: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      default: 1198,
    },
    price2: {
      type: String,
      required: true,
      default: 698,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
