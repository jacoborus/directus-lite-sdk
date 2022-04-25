import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";

import LiteSdk from "./lite-sdk.ts";

Deno.test("has API_URL", () => {
  const apiUrl = "https://example.com";
  const sdk = new LiteSdk(apiUrl);
  assertEquals(sdk.apiUrl, apiUrl);
});
