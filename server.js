const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RB Loan API" });
});

// Import and use the userRoutes
const userRoutes = require("./app/routes/v1/userRoutes");
const branchRoutes = require("./app/routes/v1/branchRoutes");
const clientRoutes = require("./app/routes/v1/clientRoutes");
const clientAddressRoutes = require("./app/routes/v1/clientAddressRoutes");


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/client/address", clientAddressRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
