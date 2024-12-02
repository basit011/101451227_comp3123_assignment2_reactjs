const BASE_URL =  'http://localhost:4000';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method: 'GET',
            'Content-Type': 'application/json',
            }
            const result= await fetch(url, options);
            const data = await result.json();
            return data;
    }catch (err) {
      return err;

    }
}


export const updateEmployeeById = async (empObj, id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(empObj), 
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error("Error updating employee:", err);
    return err;
  }
};


export const DeleteEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json", 
      }
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error("Error updating employee:", err);
    return err;
  }
};


export const CreateEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employees`;

  try {
    const options = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(empObj), 
    };

    const result = await fetch(url, options);

    
    if (!result.ok) {
      throw new Error("Failed to create employee, server returned an error");
    }

    
    const data = await result.json();
    return data; 
  } catch (err) {
    console.error("Error creating employee:", err);
    return { success: false, message: err.message }; 
  }
};



export const GetEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error("Error updating employee:", err);
    return err;
  }
};
