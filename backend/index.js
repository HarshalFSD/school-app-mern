const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");
const path = require("path");
const PORT = 5000;
// const MONGO_URL = "mongodb://127.0.0.1/school";
const MONGO_URL =
  "mongodb+srv://hsurwase:Harsh123@cluster0.a30fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

dotenv.config();

const _dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));

const corsOption = {
  origin: "https://school-app-mern.onrender.com",
  credentials: true,
};
app.use(cors(corsOption));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use("/", Routes);
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
