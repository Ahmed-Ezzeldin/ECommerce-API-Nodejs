const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    res.send("Our API")
})


app.listen(8000, () => {
    console.log('Server is running');
})