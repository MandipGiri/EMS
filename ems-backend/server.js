const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* mongo db connections */
const uri = process.env.ATLAS_URI; //getting mongo connection string
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected successfully.");
});

/* applying middlewares */
app.use(cors());
app.use("../uploads", express.static("uploads"));
app.use(express.json());

const departmentsRouter = require("./routes/departments");
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/api/v1/departments", departmentsRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) =>
  res.status(404).json("Error: No such route exists!")
);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
