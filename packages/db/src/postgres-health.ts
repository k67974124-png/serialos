import type { DependencyProbe } from "@serialos/application";
import { Pool } from "pg";

export class PostgresHealthProbe implements DependencyProbe {
  public readonly name = "database";
  #backgroundFailure = false;
  readonly #pool: Pool;

  public constructor(connectionString: string) {
    this.#pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 2_000,
      max: 2,
      query_timeout: 2_000,
      statement_timeout: 2_000,
    });
    this.#pool.on("error", () => {
      this.#backgroundFailure = true;
    });
  }

  public async check(): Promise<void> {
    if (this.#backgroundFailure) {
      this.#backgroundFailure = false;
      throw new Error("Database connection became unavailable");
    }
    await this.#pool.query("select 1 as available");
  }

  public async close(): Promise<void> {
    await this.#pool.end();
  }
}

export class PostgresQueueHealthProbe implements DependencyProbe {
  public readonly name = "queue";
  #backgroundFailure = false;
  readonly #pool: Pool;

  public constructor(connectionString: string) {
    this.#pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 2_000,
      max: 2,
      query_timeout: 2_000,
      statement_timeout: 2_000,
    });
    this.#pool.on("error", () => {
      this.#backgroundFailure = true;
    });
  }

  public async check(): Promise<void> {
    if (this.#backgroundFailure) {
      this.#backgroundFailure = false;
      throw new Error("Queue database connection became unavailable");
    }
    await this.#pool.query(`
      WITH claim_capability AS (
        SELECT id
        FROM jobs
        WHERE false
        FOR UPDATE SKIP LOCKED
      )
      UPDATE jobs AS job
      SET updated_at = job.updated_at
      FROM claim_capability
      WHERE job.id = claim_capability.id
    `);
  }

  public async close(): Promise<void> {
    await this.#pool.end();
  }
}
