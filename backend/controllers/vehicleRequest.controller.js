const VehicleRequest = require("../models/vehicleRequest.model");
const Vehicle = require("../models/vehicle.model");
const vehicleModel = require("../models/vehicle.model");
const sendEmail = require("../Utils/email.js")

const createRequest = async (req, res) => {
  const { username, userContact, address, vehicleNumber, date, duration, email,vendor } =  req.body;

  if (
    !username || 
    !userContact ||
    !address ||
    !vehicleNumber ||
    !date ||
    !duration || 
    !email
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newRequest = new VehicleRequest({
      userName: username,
      userContact,
      address,
      vehicleNumber,
      date,
      duration,
      email,
      vendor
    });

    await newRequest.save();

    const vehicle = await Vehicle.findOne({vehicleNumber});

    vehicle.available = false;

    await vehicle.save();

    sendEmail(email, `Your request has been submitted successfully.`, `Dear ${username}\nYou have booked vehicle for ${duration} Days starting from ${new Date(Date).toLocaleDateString()}`);

    return res.status(200).json({ message: "request created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const request = await VehicleRequest.findOneAndDelete({ _id: id });

    if (!request) {
      return res.status(400).json({ message: "request not found" });
    }

    return res.status(200).json({
      message: "request deleted",
    });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getRequests = async (req, res) => {

  const {vendor} = req.params;

  try {
    const requests = await VehicleRequest.find().sort("date");
    const vehicles = await Vehicle.find();

    if(!requests){
        return res.status(404).send('No requests found')
    }

    if(!vehicles){
        return res.status(404).send('No vehicle data available')
    }

    // const currentVendorRequestData = requests?.filter((item)=>)

    const responseData = requests.map(request=> {
        let vehicle = vehicles.filter((v)=> v.vehicleNumber === request.vehicleNumber);
        if(vendor !== vehicle.vendor){
          return
        }
        return {...request._doc, vehicleModel: vehicle[0]?.vehicleModal}
    })

    //remove all null values from request data
    const requestData = responseData.filter(item => item !== null)

    return res.status(200).json({ requests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const approveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let request = await VehicleRequest.findOneAndUpdate(
      { _id: id },
      { approved: "approved" }
    );

    if (!request) {
      return res.status(400).json({ message: "request not found" });
    }

    return res.status(200).json({ message: "request updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "internal server error" });
  }
};

const rejectRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let request = await VehicleRequest.findOneAndUpdate(
      { _id: id },
      { approved: "rejected" }
    );

    if (!request) {
      return res.status(400).json({ message: "request not found" });
    }

    const vehicle = await Vehicle.findOne({vehicleNumber: request.vehicleNumber});

    vehicle.available = true;

    await vehicle.save();

    return res.status(200).json({ message: "request updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "internal server error" });
  }
};

module.exports = {
  createRequest,
  deleteRequest,
  getRequests,
  approveRequest,
  rejectRequest,
};
