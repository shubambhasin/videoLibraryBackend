const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new mongoose.Schema({
  id: { type: Schema.Types.ObjectId, ref: "Video" },
});

const HistoryVideos = new mongoose.model("", historySchema);

module.exports = { HistoryVideos };