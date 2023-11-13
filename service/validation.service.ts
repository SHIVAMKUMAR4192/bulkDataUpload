// import fs from 'fs';
// import path from 'path';
// import Ajv from 'ajv';
// import { dbConnection } from '../db/connection';
// import { query } from 'express';
// import { InsertEmployee } from '../db/employee';

// const ajv = new Ajv();

// export async function validateAndInsertData(filePath: string) {
//   try {
//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     const jsonData = JSON.parse(fileContent);

//     const schema = {
      
//         "type": "object",
//         "properties": {
//           "name": { "type": "string" },
//           "address": {
//             "type": "object",
//             "properties": {
//               "country": { "type": "string" },
//               "pincode": { "type": "integer" },
//               "state": { "type": "string" }
//             },
//             "required": ["country", "pincode", "state"]
//           },
//           "employeeId": { "type": "integer" },
//           "salary": { "type": "integer" },
//           "designation": { "type": "string" }
//         },
//         "required": ["name", "address", "employeeId", "salary", "designation"]
      
      
//     };

//     const validate = ajv.compile(schema);

//     if (validate(jsonData)) {
//       // Use drizzle-orm to insert data into the database
//       const insertEmployeeData: InsertEmployee = {
//         name: jsonData.name,
//         address: jsonData.address,
//         employee_id: jsonData.employeeId,
//         salary: jsonData.salary,
//         designation:jsonData.designation,
//       };

//       await dbConnection.insert(insertEmployeeData).into('employee');

//       return { isValid: true };
//     } else {
//       return { isValid: false, validationErrors: ajv.errors };
//     }
//   } catch (error) {
//     console.error('Error during validation and insertion:', error);
//     return { isValid: false, error: 'Internal Server Error' };
//   }
// }