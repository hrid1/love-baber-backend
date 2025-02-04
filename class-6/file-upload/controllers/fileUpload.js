const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

const localFileUpload = async (req, res) => {
  try {
    // Fetch the uploaded file from the request
    const file = req.files.file;
    console.log("Got the file: ", file);

    // Define the path where the file will be stored
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    // Move the file to the defined path
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });

    // Send a success response
    res.json({
      success: true,
      message: "Local file uploaded Successfully",
    });
  } catch (error) {
    // Log any errors that occur
    console.log(error);
    res
      .status(500)
      .send("An error occurred while uploading the file in server");
  }
};

function isFileSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloude(file, folder, quality) {
  const options = {
    folder,
    resource_type: "auto",
  };
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// -------------------image uplaod
const imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.file;
    console.log("got file", file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }

    // uplaod in clodonary
    const response = await uploadFileToCloude(file, "codehelp");
    console.log(response);

    // save in db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// video upload
const videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoFile;

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // TODO add upper limit for video
    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: true,
        message: "File Formate not supported.",
      });
    }
    // upload to cloud
    const response = await uploadFileToCloude(file, "codehelp");
    console.log(response);
    // save db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    // send response
    res.json({
      success: true,
      message: "Video upload successfully",
      data: fileData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// image Size Reducer
const imageSizeReducer = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.imgFile;

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }
    // upload to cloud
    const response = await uploadFileToCloude(file, "codehelp", 50);
    console.log(response);

    // save in db
    const fileData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });
    // send response
    res.json({
      success: true,
      message: "Image upload successfully",
      data: fileData,
    });
  } catch (error) {}
};

module.exports = {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer,
};
