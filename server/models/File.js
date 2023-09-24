const { model, Schema, ObjectId } = require("mongoose")

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  access_link: { type: String },

  user_id: { type: ObjectId, ref: "User" },
  parent_id: { type: ObjectId, ref: "File" },

  children: [{ type: ObjectId, ref: "File" }],
})

module.exports = model("File", File)
