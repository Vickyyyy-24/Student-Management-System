require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");


app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// start API route
app.get("/", (req, res) => {
    res.send("Server is running");
});

//routes
app.use("/api/student", require("./routes/studentRoutes"));

//db connection
connectDB();


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});