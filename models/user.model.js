const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    grades: [
      {
        subject: String,
        result: Number,
        year: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
