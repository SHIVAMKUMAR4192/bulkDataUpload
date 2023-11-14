import { InferModel } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const employee = pgTable('employee', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    address: varchar('address').notNull(), 
    employee_id: integer('employee_id').notNull(),
    salary: integer('salary').notNull(), 
    designation: varchar('designation').notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  });


export type SelectEmployee = InferModel<typeof employee>;
export type InsertEmployee = InferModel<typeof employee, 'insert'>;

export const SelectEmployee1 = createSelectSchema(employee);
export const InsertEmployee1 = createInsertSchema(employee);