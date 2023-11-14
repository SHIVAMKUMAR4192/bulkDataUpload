import { Request, Response } from 'express';
import Ajv from 'ajv';
import fs from 'fs';
import { dbConnection } from '../db/connection';
import { InsertEmployee, employee } from '../db/employee';

const ajv = new Ajv();

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      address: {
        type: 'object',
        properties: {
          country: { type: 'string' },
          pincode: { type: 'integer' },
          state: { type: 'string' },
        },
        required: ['country', 'pincode', 'state'],
      },
      employeeId: { type: 'integer' },
      salary: { type: 'integer' },
      designation: { type: 'string' },
    },
    required: ['name', 'address', 'employeeId', 'salary', 'designation'],
  },
};

export const uploadFile = (req: Request, res: Response) => {
  try {
    const uploadedFile: Express.Multer.File | undefined = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    fs.readFile(uploadedFile.path, 'utf8', async (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading the uploaded file' });
      }

      const jsonData = JSON.parse(data);
      console.log('jsonData:', jsonData);

      const validate = ajv.compile(schema);
      const valid = validate(jsonData);

      if (!valid) {
        return res.status(400).json({ error: 'Invalid JSON data', errors: validate.errors });
      }

      try {
        for (const jsonDataValue of jsonData) {
          if (jsonDataValue.hasOwnProperty('employeeId')) {
            console.log('Inserting Employee Data:', jsonDataValue);
            const employeeInfo = {
              name: jsonDataValue.name,
              address: JSON.stringify(jsonDataValue.address),
              employee_id: jsonDataValue.employeeId,
              salary: jsonDataValue.salary,
              designation: jsonDataValue.designation,
            };
            // Assuming some hypothetical syntax for inserting employee data
            await dbConnection.insert(employee).values(employeeInfo).returning();
            console.log('Employee Data Inserted Successfully');
          }
        }
        res.status(200).json({ message: 'JSON data is valid and inserted into the database' });
      } catch (error) {
        console.error('Error inserting data into the database:', error);
        console.error('Data being inserted:', jsonData);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default uploadFile;
