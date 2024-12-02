const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 4000;
require("./Models/db");

const EmployeeRouter = require("./Routes/EmployeeRoutes");

app.get("/", (req, res) => {
  res.send("Welcome to My API!");
});


app.use(bodyParser.json());

app.use("/api/employees", EmployeeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

