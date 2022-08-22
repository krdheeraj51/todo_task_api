const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const useSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  user_type: {
    type: Number,
    required: true,
  },
});
let collectionName = "user";
mongoose.model("users", useSchema, collectionName);
