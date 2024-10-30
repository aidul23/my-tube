const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null;
        }

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        //file successfully uploaded
        console.log("File uploaded on cloudinary", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove locally saved temp file if upload got failed
    }
}

module.exports = {uploadOnCloudinary}