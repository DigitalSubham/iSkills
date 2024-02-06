const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
  },
  profession: {
    type: String,
    trim: true,
  },
});

const PROFILE = mongoose.model("Profile", profileSchema);

module.exports = PROFILE;
