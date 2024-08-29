const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import JWT for token generation
const pool = require("./DB/config");
const cors = require("cors");

// Middleware to parse JSON request bodies
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "your_jwt_secret_key"; // Replace with a secure key in production

// API route for signing up a new developer
app.post("/api/signup", async (req, res) => {
  const { developer_name, username, password } = req.body;

  // Check if all required fields are provided
  if (!developer_name || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the username already exists in the database
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    // If username exists, return an error message
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (developer_name, username, password) VALUES ($1, $2, $3) RETURNING *",
      [developer_name, username, hashedPassword]
    );

    // Generate a JWT token with the new user's ID
    const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with a success message, the JWT token, and developer's name
    res.status(201).json({
      message: "Developer signed up successfully!",
      token,
      developer_name: newUser.rows[0].developer_name, // Send developer's name
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Login API route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Missing username or password");
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the user exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = userResult.rows[0]; // Get the first row from the result
    console.log("User fetched:", user);

    if (!user) {
      console.log("Invalid username");
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", validPassword);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Token generated:", token);

    // Send the token and developer's name to the client
    res.status(200).json({
      message: "Login successful",
      token,
      developer_name: user.developer_name, // Send developer's name
    });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/add-poc", async (req, res) => {
  const {
    client_code,
    end_client,
    req_date,
    req_time,
    poc_title,
    poc_link,
    req_type,
    developer_name,
    res_date,
    res_time,
  } = req.body;

  if (
    !client_code ||
    !end_client ||
    !req_date ||
    !req_time ||
    !poc_title ||
    !poc_link ||
    !req_type ||
    !developer_name ||
    !res_date ||
    !res_time
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newPOC = await pool.query(
      "INSERT INTO tracker (client_code, end_client, req_date, req_time, poc_title, poc_link, req_type, developer_name, res_date, res_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        client_code,
        end_client,
        req_date,
        req_time,
        poc_title,
        poc_link,
        req_type,
        developer_name,
        res_date,
        res_time,
      ]
    );

    res
      .status(201)
      .json({ message: "POC link added successfully!", poc: newPOC.rows[0] });
  } catch (err) {
    console.error("Error adding POC link:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Add this to your existing Express.js setup
app.post("/api/add-client", async (req, res) => {
  const { client_code, client_name, client_manager, client_spoc_cs } = req.body;

  if (!client_code || !client_name || !client_manager || !client_spoc_cs) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newClient = await pool.query(
      "INSERT INTO client (client_code, client_name, client_manager, client_spoc_cs) VALUES ($1, $2, $3, $4) RETURNING *",
      [client_code, client_name, client_manager, client_spoc_cs]
    );

    res.status(201).json({
      message: "Client added successfully!",
      client: newClient.rows[0],
    });
  } catch (err) {
    console.error("Error adding client:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// API route for adding a client
app.post("/api/add-client", async (req, res) => {
  const { client_code, client_name, client_manager, client_spoc_cs } = req.body;

  // Check if all required fields are provided
  if (!client_code || !client_name || !client_manager || !client_spoc_cs) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Insert the new client into the database
    const newClient = await pool.query(
      "INSERT INTO client (client_code, client_name, client_manager, client_spoc_cs) VALUES ($1, $2, $3, $4) RETURNING *",
      [client_code, client_name, client_manager, client_spoc_cs]
    );

    res.status(201).json({
      message: "Client added successfully!",
      client: newClient.rows[0],
    });
  } catch (err) {
    console.error("Error adding client:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Add this route to your Express server
app.get("/api/get-client-codes", async (req, res) => {
  try {
    const result = await pool.query("SELECT client_code FROM client");
    const clientCodes = result.rows.map((row) => row.client_code);
    res.json({ client_codes: clientCodes });
  } catch (err) {
    console.error("Error fetching client codes:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Basic route to check if the app is working
app.get("/", (req, res) => {
  res.send("App is working here");
});

// Start the server
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
