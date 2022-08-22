const mongoose = require("mongoose");
const subTasks = require("./SubTask");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const taskSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  // sub_tasks: [
  //   {
  //     type: Schema.ObjectId,
  //     ref: "sub_task",
  //   },
  // ],
  status: {
    type: String,
    default: "active",
  },
  timestamps: { type: Date, default: Date.now },
  // updatedAt: new Date(0),
});
let collectionName = "task";
mongoose.model("tasks", taskSchema, collectionName);
