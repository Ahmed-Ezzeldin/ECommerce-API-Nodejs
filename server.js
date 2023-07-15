const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");


dotenv.config({ path: "config.env" })
const dbConnection = require("./config/database")
const categoryRoute = require("./routes/category_route")

// ------------------------------------------- Connect with DB
dbConnection();

// ------------------------------------------- express 
const app = express();

// ------------------------------------------- middlewares 
app.use(express.json());

if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
}

// ------------------------------------------- Mount Route
app.use("/api/v1/categories", categoryRoute);

// ------------------------------------------- Server listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})







/*
________________________________________________________________________________________________
________________________________________________________________________________________________

 ===============================================> To Do Tasks
 * test 1
 * test 2

 ===============================================> Git for tomorrow
 
 git commit -m "Project Folders Structure"

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
