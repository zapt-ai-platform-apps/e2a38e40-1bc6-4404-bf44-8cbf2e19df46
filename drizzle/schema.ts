import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const deceased = pgTable('deceased', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  dateOfDeath: timestamp('date_of_death').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Deceased = typeof deceased.$inferSelect;