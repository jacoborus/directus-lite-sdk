import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";

import LiteSdk from "./lite-sdk.ts";

Deno.test("class has API_URL prop", () => {
  const apiUrl = "https://example.com";
  const sdk = new LiteSdk(apiUrl);
  assertEquals(sdk.apiUrl, apiUrl);
});

Deno.test("simple query path", () => {
  const apiUrl = "https://example.com";
  const sdk = new LiteSdk(apiUrl);
  const result = "https://example.com/my/path";
  assertEquals(sdk.query("my/path"), result);
});
