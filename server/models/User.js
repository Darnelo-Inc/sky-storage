const { Scheme, model, ObjectId } = require("mongoose")

const User = new Scheme({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  disk_space: { type: Number, default: 1024 ** 3 * 10 },
  used_space: { type: Number, default: 0 },
  avatar: { type: String },

  files: [{ type: ObjectId, ref: "File" }],
})

module.exports = model("User", User)
