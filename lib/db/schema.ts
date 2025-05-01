import { mysqlTable, varchar, datetime, float, boolean, int, text } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

// Admin table
export const admin = mysqlTable('admin', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
});

// Category table
export const category = mysqlTable('category', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

// MenuItem table
export const menuItem = mysqlTable('menu_item', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: float('price').notNull(),
  isMainMenu: boolean('is_main_menu').notNull().default(false),
  imageUrl: varchar('image_url', { length: 512 }).notNull(),
  isSpecial: boolean('is_special').notNull().default(false),
  itemType: varchar('item_type', { length: 50 }).notNull(), // enum values: 'starter', 'maindish', 'dessert'
  categoryId: varchar('category_id', { length: 36 }).notNull(),
});

// MenuSettings table
export const menuSettings = mysqlTable('menu_settings', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  showPrice: boolean('show_price').notNull().default(true),
  showDescription: boolean('show_description').notNull().default(true),
  createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
});

// Reservation table
export const reservation = mysqlTable('reservation', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 255 }).notNull(),
  numberOfGuests: int('number_of_guests').notNull(),
  date: datetime('date').notNull(),
  time: varchar('time', { length: 50 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('Pending'), // enum values: 'Pending', 'Confirmed', 'Cancelled'
  createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
});

// Relations
export const categoryRelations = relations(category, ({ many }) => ({
  menuItems: many(menuItem),
}));

export const menuItemRelations = relations(menuItem, ({ one }) => ({
  category: one(category, {
    fields: [menuItem.categoryId],
    references: [category.id],
  }),
}));
