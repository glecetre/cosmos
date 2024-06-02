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
