import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;

const url = `${SUPABASE_URL}/functions/v1/generate-persona`;
const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON_KEY,
};

Deno.test("rejects unauthenticated requests", async () => {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ job_title: "Engineer", department: "IT" }),
  });
  assertEquals(res.status, 401);
  await res.text();
});

Deno.test("rejects oversized job_title (no auth still 401)", async () => {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ job_title: "A".repeat(300), department: "IT" }),
  });
  // Auth check runs first, so expect 401 not 400
  assertEquals(res.status, 401);
  await res.text();
});
