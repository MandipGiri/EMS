const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const roleSchema = new Schema(
  {
    departmentId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Role = moongoose.model("Role", roleSchema);

module.exports = Role;
