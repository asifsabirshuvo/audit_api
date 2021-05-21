const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auditSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  code: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  createdBy: {
    type: String,
    default: Date.now()
  },
  updatedBy: {
    type: String,
    default: Date.now()
  }
});

module.exports = mongoose.model("Audit", auditSchema);