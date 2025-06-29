// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();
// connectDB();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/operator", require("./routes/operator"));
// app.use("/api/students", require("./routes/students"));


// // Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const operatorRoutes = require("./routes/operatorRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/operator", operatorRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
