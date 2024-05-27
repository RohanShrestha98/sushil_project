const User = require("../models/user.model")
const VehicleRequest = require("../models/vehicleRequest.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
const Vehicle = require("../models/vehicle.model")

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "missing fields" })
    }

    try {
        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(400).json({ message: "user not found" })
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if (!checkPassword) {
            return res.status(400).json({ message: "invalid password" })
        }

        const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        return res.status(200).json({
            message: "login success",
            token, 
            phoneNumber: checkUser.phoneNumber,
            username: checkUser.username,
            email: checkUser.email
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}


const signup = async (req, res) => {
    const { email, password, phoneNumber, username } = req.body;


    if (!email || !password || !phoneNumber || !username) {
        return res.status(400).json({ message: "missing fields" })
    }


    try {

        const checkExistingEmail = await User.findOne({ email });
        const checkExistingPhoneNumber = await User.findOne({phoneNumber});

        if (checkExistingEmail) {
            return res.status(400).json({ message: "email already exists" })
        }

        if(checkExistingPhoneNumber){
            return res.status(400).json({message: "phone number already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            phoneNumber,
            username
        })

        await newUser.save();

        return res.status(201).json({ message: "user created" })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (!users) {
            return res.status(400).json({})
        }

        return res.status(200).json({ users })

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}


const getBookingsByContact = async(req, res) => {
    const {contact} = req.params
    if(!contact){
        return res.status(400).json("contact is required")
    }

    try{
        const Bookings = await VehicleRequest.find({userContact: contact});
        const Vehicles = await Vehicle.find();

        const data = Bookings.map(item=>{
            const vehicle = Vehicles.filter(v=>v.vehicleNumber === item.vehicleNumber)[0];
            return {...item._doc, vehicle}
        })

        if(!Bookings){
            return res.status(400).json("bookings not found")
        }

        return res.status(200).json({data})
    }
    catch(err){
        return res.status(500).json("internal server error")
    }
}


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const package = await User.findOneAndDelete({_id: id});

        if(!package){
            return res.status(400).json({message: "User not found"});
        }

        return res.status(200).json({
            message: "User deleted"
        })

    } catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

module.exports = {
    login,
    signup,
    getBookingsByContact,
    getUsers,
    deleteUser
}