const User = require("../models/User");
const UserImg = require("../models/UserImg");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const uploadImageController = async (req, res) => {
  try {
    const { imgName, image } = req.body;

    if (!imgName || !image) {
      return res.send(error(400, "imgName and image are required."));
    }

    // upload the image to cloudinary
    const cloudImg = await cloudinary.uploader.upload(image, {
      folder: "image",
    });
    const owner = req._id;

    const user = await User.findById(req._id);

    const img = await UserImg.create({
      owner,
      imgName,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });

    user.images.push(img._id);
    await user.save();

    return res.json(success(200, { img }));
  } catch (e) {
    res.send(error(500, e));
  }
};

const getAllImagesController = async (req, res) => {
  try {
    const images = await User.findById(req._id).populate("images");
    return res.send(success(200, images));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImageController,
  getAllImagesController,
};
