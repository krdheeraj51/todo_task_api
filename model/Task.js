const mongoose = require("mongoose");
const subTasks = require("./SubTask");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const taskSchema = new Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    sub_tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "sub_task",
      },
    ],
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);
let collectionName = "task";
mongoose.model("tasks", taskSchema, collectionName);
