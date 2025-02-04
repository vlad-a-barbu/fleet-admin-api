import { Hono } from "hono";
import { cors } from "hono/cors";
import roles from "./roles.ts";
import { db } from "./db.ts";

const app = new Hono();

app.use("*", cors());

roles(app);

// test db access -> WIP
app.get("/dbRoles", async (c) => {
  const { companyId } = c.req.query();
  const result = await db.query(
    `exec [dbo].[usp_GetRoles] @CompanyId = ${companyId ?? 1};`
  );
  return c.json(result);
});

Deno.serve({ port: 3000 }, app.fetch);
