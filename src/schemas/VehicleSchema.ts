import { z } from 'zod';

export default z.object({
  model: z
    .string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    })
    .min(3, { message: 'Model must be 3 or more characters long' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    })
    .min(
      1900,
      { message: 'Year must be equal or greater than 1900' },
    )
    .max(
      2022,
      { message: 'Year must be equal or less than 2022' },
    ),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  buyValue: z.number({
    required_error: 'Buy value is required',
    invalid_type_error: 'Buy value must be a number',
  }).int({
    message: 'Buy value must be an integer',
  }),
  _id: z.optional(
    z
      .string({ invalid_type_error: 'Id must be a string' })
      .regex(
        /^[0-9a-fA-F]{24}$/,
        { message: 'Id must have 24 hexadecimal characters' },
      ),
  ),
});
