import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // State variables for form inputs and feedback messages
  const [developerName, setDeveloperName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  });

  // Function to handle form submission
  const collectData = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      // Make the API request
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST", // HTTP method for creating new resources
        headers: {
          "Content-Type": "application/json", // Indicates the type of content being sent
        },
        body: JSON.stringify({
          developer_name: developerName, // Form data to be sent
          username: username,
          password: password,
        }),
      });

      // Parse the response from JSON
      const data = await response.json();

      if (response.ok) {
        // If the response status is OK (200-299), store the token in localStorage
        localStorage.setItem("token", data.token);

        // Store developer's name (assuming it's a string)
        localStorage.setItem("developerName", data.developer_name); // Store developer's name

        // Update success state and clear the form
        setSuccess(data.message);
        setError(""); // Clear error message
        setDeveloperName(""); // Clear developer name
        setUsername(""); // Clear username
        setPassword(""); // Clear password

        // Navigate to the home page or another protected page
        navigate("/");
      } else {
        // If the response status is not OK, update error state
        setError(data.message);
        setSuccess(""); // Clear success message
      }
    } catch (err) {
      // Handle any errors during fetch
      setError("An error occurred while signing up.");
      setSuccess(""); // Clear success message
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">Developer Signup</h2>
          <Form onSubmit={collectData}>
            <Form.Group className="mb-3" controlId="formDeveloperName">
              <Form.Label>Developer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={developerName}
                onChange={(e) => setDeveloperName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>

            {/* Conditional rendering of feedback messages */}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
