import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

//connection
mongoose.connect("mongodb://localhost:27017/spotifyDatabase");

//Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//model
const userModel = mongoose.model("users", userSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is in progress");
});

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne(req.body);
    // console.log(req.body);
    // if (!user) return res.status(404).json({ message: "User not found" });
    if (user) return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  let user = new userModel(req.body);
  user = await user.save();
  res.send({ message: "User registered successfully" });
});

app.listen(5000, (err) => {
  if (err) console.log(err);
  console.log("server is running");
});
