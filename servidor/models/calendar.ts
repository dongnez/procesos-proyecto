import { Schema, model } from "mongoose";

const CalendarSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },
    date:{
      type: Date,
      required: true,
    },
    foods: [
      {
        _id: false,
        food: {
          type: Schema.Types.ObjectId,
          ref: "Food",
        },
        quantity: {
          type: Number,
          required: true,
          _id: false,
        },
      },
    ],
  },
  { collection: "calendar", }
);

export const CalendarModel = model("Calendar", CalendarSchema);
