const router = require("express").Router();
let Departments = require("../models/departments.model");

router.route("/").get((req, res) => {
  Departments.find()
    .then((departments) => res.json(departments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const department = req.body.department;

  const newDepartment = new Departments({
    department,
  });

  newDepartment
    .save()
    .then(() => res.json("Department added successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
