import { runDevelopmentSeed } from "./development-seed.js";

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl === undefined || databaseUrl.length === 0) {
  throw new Error("DATABASE_URL is required");
}

if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
  throw new Error("Development seed requires NODE_ENV=development or NODE_ENV=test");
}

await runDevelopmentSeed(databaseUrl);
process.stdout.write("Synthetic development seed is present.\n");
