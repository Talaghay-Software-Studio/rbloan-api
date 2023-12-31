const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8080", "http://18.191.79.11:8080"]
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
const clientBusinessRoutes = require("./app/routes/v1/clientBusinessRoutes");
const clientCollateralRoutes = require("./app/routes/v1/clientCollateralRoutes");
const clientDependentsRoutes = require("./app/routes/v1/clientDependentsRoutes");
const clientEmploymentRoutes = require("./app/routes/v1/clientEmploymentRoutes");
const clientReferenceRoutes = require("./app/routes/v1/clientReferenceRoutes");
const clientSpouseRoutes = require("./app/routes/v1/clientSpouseRoutes");
const areaRoutes = require("./app/routes/v1/areaRoutes");
const collectorRoutes = require("./app/routes/v1/collectorRoutes");
const transactionRoutes = require("./app/routes/v1/transactionRoutes.js");


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/client/address", clientAddressRoutes);
app.use("/api/v1/client/business", clientBusinessRoutes);
app.use("/api/v1/client/collateral", clientCollateralRoutes);
app.use("/api/v1/client/dependents", clientDependentsRoutes);
app.use("/api/v1/client/employment", clientEmploymentRoutes);
app.use("/api/v1/client/reference", clientReferenceRoutes);
app.use("/api/v1/client/spouse", clientSpouseRoutes);
app.use("/api/v1/area", areaRoutes);
app.use("/api/v1/collector", collectorRoutes);
app.use("/api/v1/transaction", transactionRoutes);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
