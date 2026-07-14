import { drizzle } from "drizzle-orm/node-postgres";
import type { Pool } from "pg";

import { foundationSchema } from "./schema/foundation.js";

export function createSerialOsDatabase(pool: Pool) {
  return drizzle(pool, { schema: foundationSchema });
}

export type SerialOsDatabase = ReturnType<typeof createSerialOsDatabase>;
