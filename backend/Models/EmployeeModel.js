const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  position: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
    min: 0,
  },

  date_of_joining: {
    type: Date
  },

  department: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: new Date(),
  },

  updated_at: {
    type: Date,
    default: new Date(),
  },
});
const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;
