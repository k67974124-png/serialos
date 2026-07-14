import type { Pool } from "pg";

export interface TransactionContext {
  readonly query: <Row extends object>(sql: string, parameters?: readonly unknown[]) => Promise<readonly Row[]>;
}

export interface TransactionManager {
  readonly inTransaction: <Result>(work: (transaction: TransactionContext) => Promise<Result>) => Promise<Result>;
}

export class PostgresTransactionManager implements TransactionManager {
  readonly #pool: Pool;

  public constructor(pool: Pool) {
    this.#pool = pool;
  }

  public async inTransaction<Result>(
    work: (transaction: TransactionContext) => Promise<Result>,
  ): Promise<Result> {
    const client = await this.#pool.connect();
    try {
      await client.query("BEGIN");
      const result = await work({
        query: async <Row extends object>(statement: string, parameters: readonly unknown[] = []) => {
          const queryResult = await client.query(statement, [...parameters]);
          return queryResult.rows as readonly Row[];
        },
      });
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
