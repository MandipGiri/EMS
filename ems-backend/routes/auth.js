const router = require("express").Router();
let Users = require("../models/users.model");
const bcrypty = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/login").post((req, res) => {
  const { email, password } = req.body;
  /* finding if user exists */
  Users.findOne({ email }, (err, response) => {
    if (response) {
      /* if exits checking if password matches */
      /* password are hashed */
      bcrypty.compare(password, response.password, (error, result) => {
        if (error) res.status(401).json("Invalid password");
        else {
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
        }
      });
    } else res.status(400).json("No email address found.");
  });
});

module.exports = router;
