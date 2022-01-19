const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/team", require("./routes/team"));
app.use("/api/schedule", require("./routes/schedule"));
app.use("/api/news", require("./routes/news"));
app.use("/api/upload", require("./routes/upload"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
