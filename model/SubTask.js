const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const subTaskSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  title: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  taskId: {
    type: String,
    required: true,
  },
  timestamps: { type: Date, default: Date.now },
  // updatedAt: new Date(0)
});
let collectionName = "sub_task";
mongoose.model("sub_tasks", subTaskSchema, collectionName);
