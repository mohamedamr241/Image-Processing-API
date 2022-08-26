import { checkImageExistance } from '../routes/api/checkImageExistance';
import { resizeImage } from '../routes/api/resizeImage';
import app from '../index';
import routes from '../routes/api/imageResize';
import supertest from 'supertest';

const request_app = supertest(app);
const request_routes = supertest(routes);

describe('1. Testing endpoint responses', () => {
  it('1.1 get the /api endpoint', function (done) {
    async () => {
      const response = await request_app.get('/api');
      expect(response.status).toBe(200);
    };
    done();
  });
  it('1.2 get the /api/images', function (done) {
    async () => {
      const response = await request_routes.get(
        '/images?filename=fjord&width=200&height=200'
      );
      expect(response.status).toBe(200);
    };
    done();
  });
});
describe('2. testing existance of image', () => {
  it('2.1 check functionality of resizing and checkImageExistance functions', function (done) {
    async () => {
      await resizeImage('fjord', 200, 200, 'fjord_200_300.jpg');
      const isImageResized = await checkImageExistance('fjord', 200, 200);
      expect(isImageResized).toBe(true);
    };
    done();
  });
});
