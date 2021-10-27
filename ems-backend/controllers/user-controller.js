const bcrypty = require("bcrypt");

let User = require("../models/users.model");
let sendNotifications = require("../firebase/firebaseConfig");
let FCMTokens = require("../models/fcmToken.model");
/* get all users */
exports.user_get_all = (req, res) => {
  FCMTokens.find({}).then((tokens) => {
    console.log(`tokens.length`, tokens.length);
    if (!!tokens.length) {
      tokens.map((tok) => {
        sendNotifications(tok.fcmToken, "", "HELLO BRO");
      });
    }
  });
  /* query to not give out admin account as user and not sending some fields */
  User.find(
    { email: { $ne: "admin@ems.com" }, isVerified: true },
    { password: 0, __v: 0, updatedAt: 0 }
  )
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

/* get approval list */
exports.get_pending_user = (req, res) => {
  /* query to not give out admin account as user and not sending some fields */
  User.find(
    { email: { $ne: "admin@ems.com" }, isVerified: false },
    { password: 0, __v: 0, updatedAt: 0 }
  )
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

/* update a user  */
exports.update_user = (req, res) => {
  const userId = req.params.userId;
  console.log(`req.body`, req.body);

  const {
    fullName,
    dateOfBirth,
    email,
    contactNumber,
    department,
    role,
    workExperience,
    academicInfo,
  } = req.body;
  let document = null;
  if (req.file) document = req.file.path;

  User.updateOne(
    { _id: userId },
    {
      $set: {
        isVerified: true,
        fullName,
        dateOfBirth,
        email,
        contactNumber,
        department,
        role,
        workExperience,
        academicInfo,
        document,
      },
    },
    (error, response) => {
      if (response) res.json("User Updated Successfully!");
      else res.status(403).json("Error:" + error);
    }
  );
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
    } else res.status(400).json("Error: " + error);
  });
};

/* get user detail */
exports.get_user = (req, res) => {
  const userId = req.params.userId;
  User.findOne(
    { _id: userId },
    { password: 0, __v: 0, updatedAt: 0 },
    (error, user) => {
      if (user) res.json(user);
      else res.status(403).json("Error:" + error);
    }
  );
};

/* get user detail */
exports.accept_user = (req, res) => {
  const userId = req.params.userId;
  User.updateOne(
    { _id: userId },
    { $set: { isVerified: true } },
    (error, response) => {
      if (response) res.json("User is now a employee!");
      else res.status(403).json("Error:" + error);
    }
  );
};
