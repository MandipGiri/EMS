let Departments = require("../models/departments.model");

exports.get_all_departments = (req, res) => {
  Departments.find()
    .then((departments) => res.json(departments))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.add_department = (req, res) => {
  const department = req.body.department;
  console.log(`req.body`, req.body);

  const newDepartment = new Departments({
    department,
  });

  newDepartment
    .save()
    .then(() => res.json("Department added successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
};
