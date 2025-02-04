import { Hono } from "hono";
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

app.get("roles", (c) => {
  const { pageNumber, pageSize } = c.req.query();
  const from = +pageNumber * +pageSize;
  const batch = roles.slice(from, from + +pageSize);
  return c.json(batch);
});

Deno.serve({ port: 3000 }, app.fetch);
