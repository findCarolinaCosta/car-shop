import { z } from 'zod';

export default z.object({
  doorsQty: z
    .number({
      required_error: 'Quantity of door is required',
      invalid_type_error: 'Quantity of door must be a number',
    })
    .min(
      2,
      { message: 'Quantity of door must be equal or greater than 2' },
    )
    .max(
      4,
      { message: 'Quantity of door must be equal or less than 4' },
    ),
  seatsQty: z
    .number({
      required_error: 'Quantity of seats is required',
      invalid_type_error: 'Quantity of seats quantity must be a number',
    })
    .min(
      2,
      { message: 'Quantity of seats must be equal or greater than 2' },
    )
    .max(
      7,
      { message: 'Quantity of seats must be equal or less than 7' },
    ),
});
