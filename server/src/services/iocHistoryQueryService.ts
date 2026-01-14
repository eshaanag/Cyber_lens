import pool from "../db";

export interface HistoryQueryParams {
  ownerId: string;
  limit: number;
  offset: number;
}

export async function queryHistory({
  ownerId,
  limit,
  offset,
}: HistoryQueryParams) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM ioc_query
    WHERE client_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [ownerId, limit, offset]
  );

  return rows; // [] if empty
}
