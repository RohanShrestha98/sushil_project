const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact_number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  citizenship: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vendor", vendorSchema);
