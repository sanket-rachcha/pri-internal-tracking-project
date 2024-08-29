import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.warn(data);

      if (response.ok) {
        setSuccess(data.message);
        setError(""); // Clear error message

        // Save JWT token to local storage
        localStorage.setItem("token", data.token);

        // Store developer's name if available
        if (data.developer_name) {
          localStorage.setItem("developerName", data.developer_name);
        } else {
          console.error("Developer name is undefined");
        }

        // Navigate to the home page or another protected page
        navigate("/");
      } else {
        setError(data.message);
        setSuccess(""); // Clear success message
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred while logging in.");
      setSuccess(""); // Clear success message
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">Developer Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
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

export default Login;
