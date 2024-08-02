const express = require("express");
const path = require("path");

// V2

const app = express();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/team", require("./routes/team"));
app.use("/api/news", require("./routes/news"));
app.use("/api/upload", require("./routes/upload"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client2/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client2", "dist", "index.html"));
  });
}

// Listen server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
