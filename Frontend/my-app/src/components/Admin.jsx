import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "../styles/Admin.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee details

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        setError("Failed to fetch employees.");
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Error fetching employees.");
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError("Failed to fetch products.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error fetching products.");
    }
  };

  // Fetch full employee details
  const fetchEmployeeDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/employee/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedEmployee(data); // Set selected employee details
      } else {
        setError("Failed to fetch employee details.");
      }
    } catch (err) {
      console.error("Error fetching employee details:", err);
      setError("Error fetching employee details.");
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-employee/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      } else {
        setError("Failed to delete employee.");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Error deleting employee.");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchProducts();
  }, []);

  // Prepare data for the histogram
  const productNames = products.map((product) => product.name);
  const productQuantities = products.map((product) => product.quantity);

  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: "Product Quantities",
        data: productQuantities,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1.0,
        barThickness: 75,
      },
    ],
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="employee-management">
        <h3>Employee Management</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Details</th> {/* Added "Details" column */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn details-btn"
                    onClick={() => fetchEmployeeDetails(employee._id)} // Fetch details on click
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display employee details */}
      {selectedEmployee && (
        <div className="employee-details-modal">
          <h3>Employee Details</h3>
          <p><strong>First Name:</strong> {selectedEmployee.firstName}</p>
          <p><strong>Last Name:</strong> {selectedEmployee.lastName}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Role:</strong> {selectedEmployee.role}</p>
          <p><strong>Username:</strong> {selectedEmployee.username}</p> {/* Displaying username */}
          <p><strong>Phone Number:</strong> {selectedEmployee.phoneNumber}</p> {/* Displaying phone number */}
          <p><strong>Address:</strong> {selectedEmployee.address}</p> {/* Displaying address */}
          <p><strong>Password:</strong> {selectedEmployee.password}</p> {/* Displaying password */}
          <button
            className="btn close-btn"
            onClick={() => setSelectedEmployee(null)} // Close the details modal
          >
            Close
          </button>
        </div>
      )}

      <div className="product-analytics">
        <h3>Product Analytics</h3>
        {products.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p>No products available to display.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
