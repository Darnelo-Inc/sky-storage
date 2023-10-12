import { Document, Model, Schema, model } from "mongoose"

export interface IFile extends Document {
  name: string
  type: string
  size: number
  path: string
  access_link: string
  creation_date: Date
  user_id: Schema.Types.ObjectId
  parent_id: Schema.Types.ObjectId
  children: Schema.Types.ObjectId[]
}

const fileSchema: Schema<IFile> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  access_link: { type: String },
  creation_date: { type: Date },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  parent_id: { type: Schema.Types.ObjectId, ref: "File" },
  children: [{ type: Schema.Types.ObjectId, ref: "File" }],
})

const File: Model<IFile> = model<IFile>("File", fileSchema)

export default File
