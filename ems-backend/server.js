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
app.use(express.json());

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
