let Users = require("../models/users.model");
let FCMTokens = require("../models/fcmToken.model");
const bcrypty = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;
  /* finding if user exists */
  Users.findOne({ email }, (err, response) => {
    if (response) {
      /* if exits checking if password matches */
      /* password are hashed every hash is not same so compare function from package needed*/
      bcrypty.compare(password, response.password, (error, result) => {
        if (error) res.status(401).json("Invalid password");
        else if (result) {
          const token = jwt.sign(
            { email, userId: response._id },
            process.env.JWT_KEY,
            {
              expiresIn: "3h",
            }
          );
          res.json({
            token,
            message: "Login Successful!",
          });
        } else res.status(401).json("Invalid password");
      });
    } else res.status(400).json("No email address found.");
  });
};

exports.change_password = (req, res) => {
  const { email, password, newPassword } = req.body;

  if (email == null || email == "") res.status(403).json("Email is required");
  else if (password == null || password == "")
    res.status(403).json("Old Password is required");
  else if (newPassword == null || newPassword == "")
    res.status(403).json("New Password is required");
  else {
    Users.updateOne({ email }, (err, success) => {
      if (error) res.status(400).json("Error:" + error);
      else res.json("Password Changed Successfully");
    });
  }
};

exports.profile = (req, res) => {
  const userId = req.userData.userId;
  Users.findOne(
    { _id: userId },
    { password: 0, __v: 0, updatedAt: 0 },
    (error, user) => {
      if (user) res.json(user);
      else res.status(403).json("Error:" + error);
    }
  );
};

exports.registerToken = (req, res) => {
  const userId = req.userData.userId;
  FCMTokens.findOne({ userId }, (err, token) => {
    if (token) {
      FCMTokens.updateOne({ userId }, { $set: { fcmToken: req.body.fcmToken } })
        .then((resp) => res.json("Token Updated Successfully!"))
        .catch((ex) => res.status(403).json("Error:" + ex));
    } else {
      const newFcm = FCMTokens({ userId, fcmToken: req.body.fcmToken });

      newFcm
        .save()
        .then((resp) => res.json("Token Added Successfully!"))
        .catch((ex) => res.status(403).json("Error:" + ex));
    }
  });
};
