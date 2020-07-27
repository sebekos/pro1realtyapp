const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/listing", require("./routes/api/listing"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/upload", require("./routes/api/upload"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/office", require("./routes/api/office"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//test
