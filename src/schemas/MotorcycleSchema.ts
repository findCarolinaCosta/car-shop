import { z } from 'zod';
import VehicleSchema from './VehicleSchema';

export default VehicleSchema.extend({
  category: z
    .enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z
    .number({
      required_error: 'EngineCapacity is required',
      invalid_type_error: 'EngineCapacity must be a number',
    })
    .min(
      0,
      { message: 'EngineCapacity of seats must be equal or greater than 0' },
    )
    .max(
      2500,
      { message: 'EngineCapacity must be equal or less than 2500' },
    )
    .int({
      message: 'EngineCapacity value must be an integer',
    }),
});
