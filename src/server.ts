import App from './app';
import { Car as ICar } from './interfaces/CarInterface';
import CustomRoute from './routes';
import CarController from './controllers/CarController';

const server = new App();

const carController = new CarController();
const carRoute = new CustomRoute<ICar>();

carRoute.addRoute(carController);

const carRoutes = new CustomRoute<ICar>();
carRoutes.addRoute(carController);

server.addRouter(carRoutes.router);

export default server;
