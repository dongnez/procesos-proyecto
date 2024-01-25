import { Schema, model } from "mongoose";
import { TemplateInterface } from "cliente/src/interfaces/TemplateInterfaces";

const TemplateSchema = new Schema<TemplateInterface>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },
    visibility: {
      type: String,
      required: true,
    },
    users: {
      type: [
        { userRef: { type: Schema.Types.ObjectId, ref: "User" }, role: String },
      ],
      required: true,
    },
    inviteCode: {
      type: String,
      required: false,
    },
  },
  { collection: "templates" }
);

export const TemplateModel = model("Template", TemplateSchema);
