const bcrypty = require("bcrypt");

let User = require("../models/users.model");

/* get all users */
exports.user_get_all = (req, res) => {
  /* query to not give out admin account as user */
  User.find({ email: { $ne: "admin@ems.com" } })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

/* add a user  */
exports.add_user = (req, res) => {
  const {
    fullName,
    dateOfBirth,
    email,
    password,
    contactNumber,
    department,
    role,
    workExperience,
    academicInfo,
  } = req.body;

  let document = null;
  if (req.file) document = req.file.path;

  User.find({ email }, (error, user) => {
    if (user.length > 0) res.status(403).json("Email already exits.");
    else {
      if (fullName == null || fullName == "") {
        res.status(403).json("Full name is required ");
      } else if (dateOfBirth == null || dateOfBirth == "") {
        res.status(403).json("DOB is required ");
      } else if (email == null || email == "") {
        res.status(403).json("Email is required ");
      } else if (password == null || password == "") {
        res.status(403).json("Password is required ");
      } else if (contactNumber == null || contactNumber == "") {
        res.status(403).json("Contact Number is required ");
      } else if (department == null || department == "") {
        res.status(403).json("Department is required ");
      } else if (role == null || role == "") {
        res.status(403).json("Role is required ");
      } else if (workExperience == null || workExperience == "") {
        res.status(403).json("Work Experience is required ");
      } else if (academicInfo == null || academicInfo == "") {
        res.status(403).json("Academic Info is required ");
      } else {
        bcrypty.hash(password, 10, (err, hash) => {
          if (err) res.status(400).json("Error : insufficient data " + err);
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
              document,
            });

            newUser
              .save()
              .then(() => res.json("User added successfully!"))
              .catch((err) => res.status(400).json("Error: " + err));
          }
        });
      }
    }
  });
};

/* remove a user */
exports.delete_user = (req, res) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId }, (error, user) => {
    if (user) {
      User.remove({ _id: userId }, (err, success) => {
        if (err) res.status(400).json("Error: " + err);
        else res.json("User deleted successfully.");
      });
    }
    elsees.status(400).json("Error: " + error);
  });
};

/* get user detail */
exports.get_user = (req, res) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId }, (error, user) => {
    if (user) res.json(user);
    else res.status(403).json("Error:" + error);
  });
};
