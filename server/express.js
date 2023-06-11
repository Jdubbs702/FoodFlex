require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menus");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 5000;
// origins
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(morgan("tiny"));

//routes
app.use("/orders", orderRoutes)
app.use("/users", usersRoutes);
app.use("/menu", menuRoutes);

//error handling
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w3cdl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Wait for connection to be established
mongoose.connection.once("open", async function () {
  // Retrieve the collections in the database
  const collections = await mongoose.connection.db.listCollections().toArray();

  // Log the names of the collections
  collections.forEach(function (collection) {
    console.log(collection.name);
  });
});
