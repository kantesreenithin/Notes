require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/notes");
//express app
const app = express();

//middlewares
const { authenticateToken } = require("./utilities");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/notes", noteRoutes);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB and listening on port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
