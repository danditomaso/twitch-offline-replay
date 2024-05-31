import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// biome-ignore lint/style/noNonNullAssertion: because I said so
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });