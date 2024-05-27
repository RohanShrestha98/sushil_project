const Vehicle = require("../models/vehicle.model");
const uploadOnCloudinary = require("../Utils/cloudinary.js")

const addVehicle = async (req, res) => {
  const { vehicleNumber, vehicleModal, perDayPrice, description, category, vendor } = req.body;

  if (!vehicleNumber || !vehicleModal || !perDayPrice || !description || !category || !vendor ) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const existingVehicle = await Vehicle.findOne({ vehicleNumber });

    if (existingVehicle) {
      return res
        .status(409)
        .json({ message: "Vehicle with this number already exists." });
    }

    const imageLocalPath = req.files.image[0].path;
    
    if(!imageLocalPath){
      return res.status(400).json("Something went wrong while uploading image to temp folder")
    }

    const displayImage = await uploadOnCloudinary(imageLocalPath);

    if(!displayImage){
      return res.status(400).json("something went while uploading image to cloudinary")
    }

    const newVehicle = new Vehicle({
      vehicleNumber,
      vehicleModal,
      description,
      perDayPrice,
      displayImage: displayImage.url,
      category,
      vendor
    });

    await newVehicle.save();

    return res.status(200).json({ message: "vehicle added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const editVehicle = async (req, res) => {};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: id });

    if (!vehicle) {
      return res.status(400).json({ message: "Vechile not found" });
    }

    return res.status(200).json({
      message: "Vechile deleted",
    });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getVehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find();

    if (!vehicles) {
      return res.status(404).json({ message: "No data available" });
    }

    return res.status(200).json({ vehicles });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getVehiclesByVendorId = async (req, res) => {
  const {vendor} = req.params;
  try{
    let vehicles = await Vehicle.find({vendor:vendor});
    if (!vehicles) {
      return res.status(404).json({
        message: "No data available"
      })
    }
    return res.status(200).json({ vehicles });
  }
  catch(error){
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
}

const getVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findOne({ _id: id });

    if (!vehicle) {
      return res.status(404).json({ message: "Vechile is not exist." });
    }

    return res.status(200).json({ vehicle });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getVehicleByCategoryAndBudget = async(req, res) => {
  const {category, max_budget} = req.params;

  try{
    const vehicles = await Vehicle.find({category});

    if(!vehicles){
      return res.status(400).json("No vehicles found")
    }
    let vehiclesData = vehicles.filter(vehicle=>vehicle.perDayPrice <= max_budget)
    return  res.status(200).json(vehiclesData);
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: "internal server error"})
  }
}

module.exports = {
  addVehicle,
  editVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicles,
  getVehiclesByVendorId,
  getVehicleByCategoryAndBudget
};
