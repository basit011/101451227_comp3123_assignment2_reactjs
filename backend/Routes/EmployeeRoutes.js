const { createEmployee, getAllEmployees, getEmployeeById, updateEmployeeById, deleteEmployeeById  } = require('../Controllers/EmployeeController');

const routes = require('express').Router();

routes.get('/', getAllEmployees);

routes.post('/', createEmployee);

routes.put("/:id", updateEmployeeById);

routes.get('/:id', getEmployeeById);

routes.delete("/:id", deleteEmployeeById);

module.exports = routes;