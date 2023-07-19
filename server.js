const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");


dotenv.config({ path: "config.env" })
const dbConnection = require("./config/database")
const ApiError = require("./utils/apiError")
const globalError = require("./middlewares/errorMiddleware")
const categoryRoute = require("./routes/categoryRoute")
const subcategoryRoute = require("./routes/subcategoryRoute")

// ------------------------------------------- Connect with DB
dbConnection();

// ------------------------------------------- express 
const app = express();

// ------------------------------------------- middlewares 
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
}

// ------------------------------------------- Mount Route
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);

app.all("*", (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
})

// ------------------------------------------- Global error handling middleware for express
app.use(globalError);

// ------------------------------------------- Server listen
const {PORT} = process.env;
const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})


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
 * test 1
 * test 2

 ===============================================> Git for tomorrow
 
 git commit -m ""

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
