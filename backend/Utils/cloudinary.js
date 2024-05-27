const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name:"dfohqeylc",
    api_key: "892192145385381",
    api_secret: "HHVODZX5KZnPmINSaXX6UGMrZRg"
})


const uploadOnCloudinary = async(localFilePath) =>{ 
    try{
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // fs.unlink(localFilePath)

        return response
    }
    catch(error){
        fs.unlinkSync(localFilePath);
        return null
    }
}

module.exports = uploadOnCloudinary;