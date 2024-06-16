import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const cosmogoniesTable = sqliteTable('cosmogonies', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updateAt: text('updated_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull()
        .$onUpdate(() => new Date().toISOString()),
});

export type SelectCosmogony = typeof cosmogoniesTable.$inferSelect;
export type InsertCosmogony = typeof cosmogoniesTable.$inferInsert;

export const charactersTable = sqliteTable('characters', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    cosmogonyId: integer('cosmogony_id')
        .notNull()
        .references(() => cosmogoniesTable.id),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    markdown: text('markdown').default('').notNull(),
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updateAt: text('updated_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull()
        .$onUpdate(() => new Date().toISOString()),
});

export type SelectCharacter = typeof charactersTable.$inferSelect;
export type InsertCharacter = typeof charactersTable.$inferInsert;
