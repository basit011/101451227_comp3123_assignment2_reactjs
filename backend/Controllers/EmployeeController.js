const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;
    // page = 1 => (1)*5 = 5 = 0 skip

    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          // case insensitive
          $options: "i",
        },
      };
    }
    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updated_at: -1 });

    const totalPages = Math.ceil(totalEmployees / limit);
    res.status(200).json({
      message: "All Employees",
      success: true,
      data: {
        employees: emps,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { name, email, position, salary, department } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      email,
      position,
      salary,
      department,
      updated_at: new Date(),
    };
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Employee Updated successfully",
      success: true,
      data: updateEmployee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      // error: err,
      error: err.message || err,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findOne({ _id: id });
    res.status(200).json({
      message: "Get Employee Details ",
      success: true,
      data: emp,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Employee Delete Successfully ",
      success: true,
      data: emp,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
