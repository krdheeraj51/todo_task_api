const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const subTaskSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
let collectionName = "sub_task";
mongoose.model("sub_tasks", subTaskSchema, collectionName);
