const router = require("express").Router();
let User = require("../models/users.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* add new user */
router.route("/add").post((req, res) => {
  const fullName = req.body.userName;
  const dateOfBirth = req.body.dateOfBirth;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const department = req.body.department;
  const role = req.body.role;
  const workExperience = req.body.workExperience;
  const academicInfo = req.body.academicInfo;

  const newUser = new User({
    fullName,
    dateOfBirth,
    email,
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
});

module.exports = router;
