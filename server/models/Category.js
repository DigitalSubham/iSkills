const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      // required: true,
    },
  ],
});

const CATEGORY = mongoose.model("Category", categorySchema);

module.exports = CATEGORY;
