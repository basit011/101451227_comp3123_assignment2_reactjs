import React, { useState, useEffect } from "react";
import { CreateEmployee } from "../api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";
import { updateEmployeeById } from "../api";

function AddEmployee({
  showModal,
  setShowModal,
  fetchEmployees,
  updateEmpObj,
}) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    department: "",
  });
  const [updateMode, setUpdateMode] = useState(false);


  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployee(updateEmpObj); 
    } else {
      setUpdateMode(false);
      setEmployee({
        name: "",
        email: "",
        position: "",
        salary: "",
        department: "",
      }); 
    }
  }, [updateEmpObj]);

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      position: "",
      salary: "",
      department: "",
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);

    try {
      const { success, message } = updateMode
        ? await updateEmployeeById(employee, employee._id) 
        : await CreateEmployee(employee); 

      console.log(success, message);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
    } catch (err) {
      notify("Failed to create employee, try again later", "error");
    }
  };

  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{
        display: showModal ? "block" : "none",
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{updateMode ? "Update Employee" : "Add Employee"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  value={employee.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {updateMode ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
