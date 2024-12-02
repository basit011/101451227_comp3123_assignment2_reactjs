import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployeeById } from '../api';
import { notify } from '../utils';


function EmployeeDetails() {
  const {id} = useParams ();
  const [empDetails, SetEmpDetails] = useState({});
  const navigate = useNavigate();
  console.log(id);

  const fetchEmpById = async() => {
     try {
      const { data } =  await GetEmployeeById(id);
      console.log(data);
      SetEmpDetails(data);

    } catch (err) {
      notify("Failed to fetch employee, try again later", "error");
    }
  }
  useEffect(() => {
    fetchEmpById();

  },[id]);
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Employee Details</h2>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="row md-3">
              <img />
            </div>
            <div className="col-md-9">
              <h4>{empDetails.name}</h4>
              <p>
                <strong>Email:</strong>
                {empDetails.email}
              </p>
              <p>
                <strong>Position:</strong>
                {empDetails.position}
              </p>
              <p>
                <strong>Salary:</strong>
                {empDetails.salary}
              </p>
              <p>
                <strong>Department:</strong>
                {empDetails.department}
              </p>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => navigate('/employee')}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails