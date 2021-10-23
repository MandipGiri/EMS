const router = require("express").Router();
let Roles = require("../models/roles.model");
let Departments = require("../models/departments.model");

router.route("/").get((req, res) => {
  Roles.find()
    .then((roles) => res.json(roles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const departmentId = req.body.departmentId;
  const role = req.body.role;

  /* Checking first whether the department exists to bind to a role */
//   if (Departments.find({ _id: departmentId }).size() > 0) {
  if (Departments.countDocuments({ _id: departmentId }, (limit = 1))) {
    const newRole = new Roles({
      departmentId,
      role,
    });

    newRole.save((err, res) => {
      if (err) res.status(400).json("Error: " + err);
      else res.json("Role added successfully!");
    });
  } else {
    res.status(400).json("Error: No such department exists!");
  }
});

module.exports = router;
