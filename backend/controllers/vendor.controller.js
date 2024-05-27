const Vendor = require("../models/vendor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const uploadOnCloudinary = require("../Utils/cloudinary");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const checkUser = await Vendor.findOne({ email });
    console.log("checkUser",checkUser)

    if (!checkUser) {
      return res.status(400).json({ message: "user not found" });
    }
    if (checkUser?.status === "block") {
      return res.status(400).json({ message: "Vendor is blocked" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "login success",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const signup = async (req, res) => {
  const { company_name, email, contact_number, password, owner_name, address } =
    req.body;

  if (
    !company_name ||
    !email ||
    !contact_number ||
    !password ||
    !owner_name ||
    !address
  ) {
    return res.status(400).json({ message: "missing fields" });
  }

  try{

    console.log({req})
    const citizenshipLocalPath = req.files.citizenship[0].path;
    const panLocalPath = req.files.pan[0].path;

    if(!citizenshipLocalPath){
        return res.status(400).json("something went wrong while uploading citizenship")
    }

    if(!panLocalPath){
        return res.status(400).json("something went wrong while uploading pan")
    }

    const citizenship = await uploadOnCloudinary(citizenshipLocalPath);
    const pan = await uploadOnCloudinary(panLocalPath);

    if(!citizenship || !pan){
        return res.status(400).json("something went wrong while uploading image to cloudinary")
    }

    const hashedPassword = await  bcrypt.hash(password, 10)

    const newVendor = new Vendor({
        company_name,
        email,
        contact_number,
        password: hashedPassword,
        owner_name,
        address,
        status:"open",
        citizenship: citizenship.url,
        pan: pan.url,
    })

    await newVendor.save();

    return res.status(201).json({message: "vendor created"})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message: "internal server error"})
  }
};

const blockVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "vendor Not Found" });
    }
    vendor.company_name = vendor?.company_name;
    vendor.email = vendor.email;
    vendor.contact_number = vendor.contact_number;
    vendor.password = vendor.password;
    vendor.owner_name = vendor.owner_name;
    vendor.address = vendor.address;
    vendor.status = vendor?.status === "block"?"open":"block";
    vendor.address = vendor.address;
    vendor.citizenship = vendor.citizenship;
    const updatedvendor = await vendor.save();
    res.status(200).json({ success: true, updatedvendor });

  } catch (error) {
    console.log("error",error)
    res.status(500).json({error:error, message: "Server Error" });
  }
}

const getVendors = async (req, res) => {
  const vendors = await Vendor.find({}).select("-password -__v")

  return res.status(200).json(vendors)
}
module.exports = {
  login,
  signup,
  getVendors,
  blockVendor,
};
