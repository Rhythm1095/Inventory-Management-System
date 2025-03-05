const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

// MongoDB connection for user data
mongoose
  .connect(
    "mongodb+srv://Rhythm1095:r%40hythm%2320051009@cluster0.9lzts.mongodb.net/mydatabase", // Your MongoDB URI for users
  )
  .then(() => console.log("MongoDB connected to user database"))
  .catch((err) => console.log("MongoDB connection error:", err));

// MongoDB connection for product data
const productDB = mongoose.createConnection(
  "mongodb+srv://Rhythm1095:r%40hythm%2320051009@cluster0.9lzts.mongodb.net/productDB", // Your MongoDB URI for products
);

productDB.on("connected", () => {
  console.log("Connected to productDB");//connected to productDB
});

productDB.on("error", (err) => {
  console.log("Error connecting to productDB: ", err);
});

// Define User Schema (for user authentication and registration)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
  phoneNumber: String,
  address: String,
  role: { type: String, default: "employee" }, // default role as 'employee'
});

// Create a model for User
const User = mongoose.model("User", userSchema);

// Define Product Schema (to store product data in productDB)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  photo: { type: String }, // Store the photo as a URL string
});

// Create a model for Product using the second connection (productDB)
const Product = productDB.model("Product", productSchema);

// Sign-up Route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber, address } = req.body;

  try {
    // Check if user already exists with the same email or username
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).send("Error: Email or Username already exists.");
    }

    let role = "employee";
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount === 0) {
      role = "admin"; // First user will be an admin
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber,
      address,
      role,
    });

    await newUser.save();
    res.status(201).send("Sign-up successful. User created!");
  } catch (err) {
    res.status(500).send("Error signing up: " + err.message);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({ email, username });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or username" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Return role information along with the success message
    res.status(200).json({ message: "Login Successful", role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Error logging in: " + err.message });
  }
});

// Add Product Route
app.post("/add-product", async (req, res) => {
  const { name, quantity, photo } = req.body;

  // Validate that name, quantity, and photo are provided
  if (!name || !quantity || !photo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new product with the provided information
    const newProduct = new Product({
      name,
      quantity,
      photo, // Store the provided photo URL directly
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding product: " + err.message });
  }
});

// Get All Products Route
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Await the query
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send("Error fetching products: " + err.message);
  }
});

// Update product quantity
app.put("/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    await Product.findByIdAndUpdate(id, { quantity });
    res.status(200).send("Product quantity updated successfully!");
  } catch (err) {
    res.status(500).send("Error updating product quantity: " + err.message);
  }
});

// Delete product
app.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).send("Product deleted successfully!");
  } catch (err) {
    res.status(500).send("Error deleting product: " + err.message);
  }
});

// Route to fetch all employees
app.get("/employees", async (req, res) => {
  try {
    // Fetch all users with the role of "employee"
    const employees = await User.find({ role: "employee" });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees: " + error.message });
  }
});

// Backend route to get employee details by ID
app.get('/employee/:id', async (req, res) => {
  try {
    const employee = await User.findById(req.params.id); // Assuming you're using MongoDB
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ message: 'Error fetching employee details' });
  }
});

// Route to delete an employee by ID
app.delete("/delete-employee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the user to ensure they exist
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete an admin" });
    }

    // Delete the employee
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee: " + error.message });
  }
});

// Set the server to listen on a specific port
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
