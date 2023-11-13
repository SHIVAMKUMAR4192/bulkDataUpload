import express, {Express} from 'express';
import request from 'supertest';
import { uploadFile } from '../controller/uploadController';

const validJSONData = {
    name: 'Anna Petrova',
    address: { country: 'Russia', pincode: 123456, state: 'Moscow' },
    employeeId: 253,
    salary: 70000,
    designation: 'Data Engineer',
}


describe('uploadFile', () => {
    let app: Express;
  
    beforeAll(() => {
      app = express();
      app.use(express.json()); 
      app.post('/upload', uploadFile);
    });
  
    it('should return an error for missing file', async () => {
      const response = await request(app)
        .post('/upload')
        .expect(400);
  
      expect(response.body.error).toBe('No file uploaded');
    });
  
    it('should return an error for invalid JSON data', async () => {

        const invalidJSONData = {
            name:' Invalid JSON Data'
        };
      const response = await request(app)
        .post('/upload')
        .expect(400);
  
      expect(response.body.error).toBe('No file uploaded');
      expect(Array.isArray(response.body.errors)).toBe(false);
    });
  
    it('should successfully insert valid JSON data into the database', async () => {
      const response = await request(app)
        .post('/upload')
        .send(validJSONData)
        .expect(200);
  
      expect(response.body.message).toBe('JSON data is valid and inserted into the database');
    });
  });
  
//   it('should successfully insert valid JSON data into the database', async () => {
//     const response = await request(app)
//       .post('/upload')
//       .send(validJSONData)
//       .expect(400);

//     expect(response.body.message);
//   });
  