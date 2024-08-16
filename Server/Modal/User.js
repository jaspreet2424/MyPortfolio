const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: Number, required: true },
  token: { type: String, default: null },
  projects: [
    {
      title: { type: String },
      description: { type: String },
      languages: { type: String },
      projectImg: { type: String },
    },
  ],
});

const userCollection = new mongoose.model("users", userSchema);

module.exports = userCollection;
