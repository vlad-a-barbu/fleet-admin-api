import { Connection, ConnectionConfiguration, Request } from "tedious";

const config: ConnectionConfiguration = {
  server: "20.73.61.128",
  options: { database: "Fleet_Dev" },
  authentication: {
    type: "default",
    options: {
      userName: "asm",
      password: "dxVSo*xxzhIo*$2G",
    },
  },
};

const conn = new Connection(config);

conn.connect();

function query<T>(sql: string): Promise<{ data: T[]; total: number }> {
  return new Promise((res, rej) => {
    conn.execSql(
      new Request(sql, (err, rowCount, rows) => {
        if (err) {
          rej(err);
        } else {
          res({
            data: rows as T[],
            total: rowCount!,
          });
        }
      })
    );
  });
}

export const db = {
  query,
};
