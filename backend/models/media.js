// models/media.js
const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String, required: true },
  media_type: { type: String, required: true },
  title: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
module.exports = mongoose.model("media", mediaSchema);
