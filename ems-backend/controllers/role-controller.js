let Roles = require("../models/roles.model");
let Departments = require("../models/departments.model");

exports.get_all_roles = (req, res) => {
  const { departmentId } = req.query;

  Roles.find(departmentId ? { departmentId } : {})
    .then((roles) => res.json(roles))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.add_role = (req, res) => {
  const departmentId = req.body.departmentId;
  const role = req.body.role;

  /* Checking first whether the department exists to bind to a role */
  Departments.countDocuments({ _id: departmentId }, function (err, count) {
    console.log(`count`, count);
    if (count > 0) {
      //Department exists
      Roles.findOne({ departmentId, role }, (err, roleExistInDepartment) => {
        if (roleExistInDepartment)
          res.status(400).json("Error: Role already exist in this department!");
        else {
          const newRole = new Roles({
            departmentId,
            role,
          });

          newRole.save((err, response) => {
            if (err) res.status(400).json("Error: " + err);
            else res.json("Role added successfully!");
          });
        }
      });
    } else res.status(400).json("Error: No such department exists!");
  });
};
