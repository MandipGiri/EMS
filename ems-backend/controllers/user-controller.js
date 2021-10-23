const bcrypty = require("bcrypt");

const checkAuth = require("../middleware/check-auth");
let User = require("../models/users.model");

/* get all users */
exports.user_get_all = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

/* add a user  */
exports.add_user = (req, res) => {
  const fullName = req.body.userName;
  const dateOfBirth = req.body.dateOfBirth;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const department = req.body.department;
  const role = req.body.role;
  const workExperience = req.body.workExperience;
  const academicInfo = req.body.academicInfo;

  User.find({ email }, (error, user) => {
    if (user.length > 0) res.status(403).json("Email already exits.");
    else {
      bcrypty.hash(req.body.password, 10, (err, hash) => {
        if (err) res.status(400).json("Error: " + err);
        else {
          const newUser = new User({
            fullName,
            dateOfBirth,
            email,
            password: hash,
            contactNumber,
            department,
            role,
            workExperience,
            academicInfo,
          });

          newUser
            .save()
            .then(() => res.json("User added successfully!"))
            .catch((err) => res.status(400).json("Error: " + err));
        }
      });
    }
  });
};

/* remove a user */
exports.delete_user = (req, res) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId }, (error, user) => {});
  User.remove({ _id: userId }, (err, success) => {
    if (err) res.status(400).json("Error: " + err);
    else res.json("User deleted successfully.");
  });
};
