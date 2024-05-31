import {
  timestamp,
  integer,
  pgTable,
  text,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";





export const users = pgTable("user", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  created: timestamp("created", { mode: "date" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
);


export const streamers = pgTable("streamer", {
  id: serial("id").primaryKey(),
  twitchId: varchar("twitchId", { length: 256 }),
  thumbnail: varchar("thumbnail", { length: 256 }),
  tags: text("tags"),
  name: varchar("name", { length: 256 }),
  created: timestamp("created", { mode: "date" }),
});

export const broadcasts = pgTable("broadcast", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  started: timestamp("started", { mode: "date" }),
  ended: timestamp("ended", { mode: "date" }),
  streamerId: serial("streamerId")
    .notNull()
    .references(() => streamers.id, { onDelete: "cascade" }),
  vodId: serial("vodId").references(() => vods.id, { onDelete: "cascade" }),
  thumbnailId: serial("thumbnailId").references(() => vods.id, { onDelete: "cascade" }),
  created: timestamp("created", { mode: "date" }),
});

export const recordings = pgTable("recording", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  userId: serial("streamerId")
    .notNull()
    .references(() => streamers.id, { onDelete: "cascade" }),
  broadcastId: serial("broadcastId")
    .notNull()
    .references(() => broadcasts.id, { onDelete: "cascade" }),
  vodId: serial("fileId").notNull().references(() => vods.id, { onDelete: "cascade" }),
  created: timestamp("created", { mode: "date" }),
});


export const vods = pgTable("vod", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  path: text("path"),
  quality: varchar("quality", { length: 100 }),
  created: timestamp("created", { mode: "date" }),
});
