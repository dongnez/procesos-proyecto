import { FoodInterface } from "cliente/src/interfaces/FoodInterfaces";
import { Schema, model } from "mongoose";

const CalendarSchema = new Schema<any>(
  {
    userId: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },
    years: [
      {
        year: {
          type: Number,
          required: true,
          minlength: 3,
          maxlength: 40,
        },
        months: [
          {
            month: {
              type: Number,
              required: true,
              minlength: 3,
              maxlength: 40,
            },
            days: [
              {
                day: {
                  type: Number,
                  required: true,
                  minlength: 3,
                  maxlength: 40,
                },
                foods: [
					{
						//TODO: No hay referencia a comida esta dentro de un array en un template
						food: {
							type: Schema.Types.ObjectId,
							ref: "Food",
						},
						quantity: {
							type: Number,
							required: true,
							minlength: 1,
							maxlength: 40,
						},
					},
				]
				
              },
            ],
          },
        ],
      },
    ],
  },
  { collection: "calendar" }
);

export const CalendarModel = model("Calendar", CalendarSchema);
