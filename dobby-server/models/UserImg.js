const mongoose = require("mongoose");

const imgSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersList",
      required: true,
    },
    image: {
      publicId: String,
      url: String,
    },
    imgName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userImages", imgSchema);
