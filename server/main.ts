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

function paginatedQuery<T>(
  source: T[],
  pageNumber: number,
  pageSize: number
): { data: T[]; total: number } {
  const from = (pageNumber - 1) * pageSize;
  const data = source.slice(from, from + pageSize);
  return {
    data,
    total: roles.length,
  };
}

app.get("roles", (c) => {
  const { pageNumber, pageSize, sortBy, sortOrder } = c.req.query();
  let source = roles;
  const asc = (sortOrder ?? "ASC").toUpperCase() === "ASC";
  switch (sortBy) {
    case "name": {
      source = roles.sort((x, y) =>
        asc ? x.name.localeCompare(y.name) : y.name.localeCompare(x.name)
      );
      break;
    }
    case "type": {
      source = roles.sort((x, y) =>
        asc ? x.type.localeCompare(y.type) : y.type.localeCompare(x.type)
      );
      break;
    }
    default: {
      source = roles.sort((x, y) => (asc ? x.id - y.id : y.id - x.id));
    }
  }
  return c.json(paginatedQuery(source, +pageNumber, +pageSize));
});

app.get("roles/:id", (c) => {
  const { id } = c.req.param();
  const role = roles.find((x) => x.id === +id);
  return c.json({
    data: role,
  });
});

Deno.serve({ port: 3000 }, app.fetch);
