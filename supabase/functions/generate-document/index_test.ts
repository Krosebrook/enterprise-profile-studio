import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;

const url = `${SUPABASE_URL}/functions/v1/generate-document`;
const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON_KEY,
};

Deno.test("rejects unauthenticated requests", async () => {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ templateType: "memo", prompt: "test", context: {} }),
  });
  assertEquals(res.status, 401);
  await res.text();
});
