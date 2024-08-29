import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    client_code: "",
    client_name: "",
    client_manager: "",
    client_spoc_cs: "",
  });
  const [message, setMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Retrieve token and developer name from localStorage
    const token = localStorage.getItem("token");
    const developerName = localStorage.getItem("developerName");

    // Check if token exists and if developerName is 'sanket.rachcha'
    if (token && developerName === "Sanket Rachcha") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      // Optionally redirect or display a message
      window.location.href = "/login"; // Redirect to login or another page
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/add-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setFormData({
          client_code: "",
          client_name: "",
          client_manager: "",
          client_spoc_cs: "",
        });
      } else {
        setMessage(result.message || "Error adding client.");
      }
    } catch (error) {
      setMessage("Error adding client.");
    }
  };

  if (!isAuthorized) {
    return <div className="container mt-5">Access denied. Please log in.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Add Client</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="client_code">Client Code</label>
          <input
            type="text"
            id="client_code"
            name="client_code"
            className="form-control"
            value={formData.client_code}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="client_name">Client Name</label>
          <input
            type="text"
            id="client_name"
            name="client_name"
            className="form-control"
            value={formData.client_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="client_manager">Client Manager</label>
          <input
            type="text"
            id="client_manager"
            name="client_manager"
            className="form-control"
            value={formData.client_manager}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="client_spoc_cs">Client SPOC CS</label>
          <input
            type="text"
            id="client_spoc_cs"
            name="client_spoc_cs"
            className="form-control"
            value={formData.client_spoc_cs}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default AddClientForm;
