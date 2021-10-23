const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    workExperience: {
      type: String,
      required: true,
    },
    academicInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = moongoose.model("User", userSchema);

module.exports = User;
