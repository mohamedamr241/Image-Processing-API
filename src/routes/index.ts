import express, { Request, Response } from 'express';
import image_routes from './api/imageResize';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('welcome to my first project :)');
});
routes.use('/images', image_routes);

export default routes;
