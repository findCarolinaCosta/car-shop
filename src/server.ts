import App from './app';
import CarController from './controllers/CarController';
import MotorcycleController from './controllers/MotorcycleController';
import { Car as ICar } from './interfaces/CarInterface';
import { Motorcycle as IMotorcycle } from './interfaces/MotorcycleInterface';
import CustomRoute from './routes';

const server = new App();

const carController = new CarController();
const carRoutes = new CustomRoute<ICar>();

const motorcycleController = new MotorcycleController();
const MotorcycleRoutes = new CustomRoute<IMotorcycle>();

carRoutes.addRoute(carController);
MotorcycleRoutes.addRoute(motorcycleController);

server.addRouter(carRoutes.router);
server.addRouter(MotorcycleRoutes.router);

export default server;
