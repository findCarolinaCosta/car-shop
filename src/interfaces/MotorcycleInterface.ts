import { z } from 'zod';
import MotorcycleSchema from '../schemas/MotorcycleSchema';
import { Vehicle } from './VehicleInterface';

type ZMotorcycle = z.infer<typeof MotorcycleSchema>;

export interface Motorcycle extends Vehicle, ZMotorcycle {}
