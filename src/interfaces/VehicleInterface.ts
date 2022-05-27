import { z } from 'zod';
import VehicleSchema from '../schemas/VehicleSchema';

export type Vehicle = z.infer<typeof VehicleSchema>;
