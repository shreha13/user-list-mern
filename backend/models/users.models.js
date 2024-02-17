const { Schema, default: mongoose } = require("mongoose");

const userSchema = Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: [true, 'User email is required'], unique: true },
  username: { type: String, required: [true, 'Username is required'], unique: true },
  description: { type: String, min: [15, 'Description should have at least 6'], required: [true, 'User description is required'] },
  phone: {type: String, unique: true },
  role: { type: String },
})

module.exports = mongoose.model("users", userSchema);