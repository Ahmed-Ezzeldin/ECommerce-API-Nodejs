const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

// Routes
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subcategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

// ------------------------------------------- Connect with DB
dbConnection();

// ------------------------------------------- express
const app = express();

// ------------------------------------------- middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// ------------------------------------------- Mount Route
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// ------------------------------------------- Global error handling middleware for express
app.use(globalError);

// ------------------------------------------- Server listen
const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Event => list => callback(err)
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});

/*
________________________________________________________________________________________________
________________________________________________________________________________________________

 ===============================================> To Do Tasks
 * temp 1
 * temp 2

 ===============================================> Git for tomorrow
 
 git commit -m "Upload Brand image"

===============================================> Basic  Architecture
|
├── Project
|   |
|   |
|   ├── config
|   |   ├── file 1
|   |   └── fils 2
|   |   
|   |   
|   ├── models
|   |   ├── file 1
|   |   └── fils 2
|   |   
|   |   
|   ├── routes
|   |   ├── file 1
|   |   └── fils 2
|   |   
|   |   
|   ├── services
|   |   ├── file 1
|   |   └── fils 2
________________________________________________________________________________________________
________________________________________________________________________________________________
 */
