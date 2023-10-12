import { Schema, model, Document, Model } from "mongoose"

export interface IUser extends Document {
  email: string
  password: string
  disk_space: number
  used_space: number
  avatar?: string
  files: Schema.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  disk_space: { type: Number, default: 1024 ** 3 * 10 },
  used_space: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
})

const User: Model<IUser> = model<IUser>("User", userSchema)

export default User
