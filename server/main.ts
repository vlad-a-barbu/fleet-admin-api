import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

interface Role {
  id: number;
  name: string;
  type: string;
}

const roles: Role[] = [...Array(100).keys()].map((id) => ({
  id,
  name: `Role ${id}`,
  type: id % 2 == 0 ? "mobile" : "admin",
}));

app.use("*", cors());

app.get("roles", (c) => {
  const { pageNumber, pageSize } = c.req.query();
  const from = (+pageNumber - 1) * +pageSize;
  const data = roles.slice(from, from + +pageSize);
  return c.json({
    data,
    total: roles.length,
  });
});

Deno.serve({ port: 3000 }, app.fetch);
