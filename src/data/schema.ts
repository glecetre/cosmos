import { relations, sql } from 'drizzle-orm';
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

export const cosmogoniesRelations = relations(cosmogoniesTable, ({ many }) => ({
    characters: many(charactersTable),
    chronicles: many(chroniclesTable),
}));

export type SelectCosmogony = typeof cosmogoniesTable.$inferSelect;
export type InsertCosmogony = typeof cosmogoniesTable.$inferInsert;

export const chroniclesTable = sqliteTable('chronicles', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    cosmogonyId: integer('cosmogony_id')
        .notNull()
        .references(() => cosmogoniesTable.id),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    markdown: text('markdown').notNull().default(''),
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updateAt: text('updated_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull()
        .$onUpdate(() => new Date().toISOString()),
});

export const chroniclesRelations = relations(chroniclesTable, ({ one }) => ({
    cosmogony: one(cosmogoniesTable, {
        fields: [chroniclesTable.cosmogonyId],
        references: [cosmogoniesTable.id],
    }),
}));

export type SelectChronicle = typeof chroniclesTable.$inferSelect;
export type InsertChronicle = typeof chroniclesTable.$inferInsert;

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

export const charactersRelations = relations(charactersTable, ({ one }) => ({
    cosmogony: one(cosmogoniesTable, {
        fields: [charactersTable.cosmogonyId],
        references: [cosmogoniesTable.id],
    }),
}));

export type SelectCharacter = typeof charactersTable.$inferSelect;
export type InsertCharacter = typeof charactersTable.$inferInsert;
