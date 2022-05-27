import { z } from 'zod';
import { Vehicle } from './VehicleInterface';
import CarSchema from '../schemas/CarSchema';

type ZCar = z.infer<typeof CarSchema>;

export interface Car extends Vehicle, ZCar {}
