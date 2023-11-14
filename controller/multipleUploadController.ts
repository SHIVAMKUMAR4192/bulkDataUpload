import { Request, Response } from 'express';
import Ajv from 'ajv';
import fs from 'fs';
import { dbConnection } from '../db/connection';
import {  InsertCompany, company } from '../db/company';
import { InsertEmployee, employee } from '../db/employee';

const ajv = new Ajv();

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
    },
    required: ['name', 'address'],
  },
};

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const uploadedFiles: Express.Multer.File[] = req.files as Express.Multer.File[];

    const errors: string[] = [];

    for (const file of uploadedFiles) {
      const data = fs.readFileSync(file.path, 'utf8');
      const jsonData = JSON.parse(data);

      const validate = ajv.compile(schema);
      const valid = validate(jsonData);
      console.log('JSON Data:', jsonData);

      if (!valid) {
        errors.push(`Invalid JSON data in file ${file.originalname}: ${ajv.errorsText(validate.errors)}`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    for (const file of uploadedFiles) {
      const data = fs.readFileSync(file.path, 'utf8');
      const jsonData = JSON.parse(data);

      try {
        for( const jsonDataValue of jsonData){
            if (jsonDataValue.hasOwnProperty('employeeId')) {
                console.log('Inserting Employee Data:', jsonData);
                const employeeInfo = {
        name: jsonDataValue.name,
         address: JSON.stringify(jsonDataValue.address), 
         employee_id: jsonDataValue.employeeId,
         salary: jsonDataValue.salary,
    designation:jsonDataValue.designation,
                }
               await dbConnection.insert(employee).values(employeeInfo).returning();
               console.log('Employee Data Inserted Successfully');
             }
              else if (jsonDataValue.hasOwnProperty('companyId')) {
               console.log('Inserting Company Data:', jsonData);
               const companyInfo = {
                  name: jsonDataValue.name,
                  address: JSON.stringify(jsonDataValue.address),
               }
               await dbConnection.insert(company).values(companyInfo).returning();
               console.log('Company Data Inserted Successfully');
             }
        }
      } catch (error) {
        console.error('Error inserting data into the database:', error);
        console.error('Data being inserted:', jsonData);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    res.status(200).json({ message: 'JSON data is valid and inserted into the database' });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

