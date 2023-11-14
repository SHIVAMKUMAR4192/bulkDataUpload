import { InferModel } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const company = pgTable('company', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  address: varchar('address').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type SelectCompany = InferModel<typeof company>;
export type InsertCompany = InferModel<typeof company, 'insert'>;

export const SelectCompanySchema = createSelectSchema(company);
export const InsertCompanySchema = createInsertSchema(company);
