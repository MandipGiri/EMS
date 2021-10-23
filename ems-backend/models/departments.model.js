const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const departmentSchema = new Schema(
  {
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Department = moongoose.model("Department", departmentSchema);

module.exports = Department;
