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
    const connectionState = { failed: false };
    const handleClientError = (): void => {
      connectionState.failed = true;
    };
    client.on("error", handleClientError);
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
      if (!connectionState.failed) {
        try {
          await client.query("ROLLBACK");
        } catch (rollbackError) {
          throw new AggregateError(
            [error],
            "Transaction failed and rollback was unsuccessful",
            { cause: rollbackError },
          );
        }
      }
      throw error;
    } finally {
      client.removeListener("error", handleClientError);
      client.release(connectionState.failed);
    }
  }
}
