import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";

import LiteSdk, { getQueryParams } from "./lite-sdk.ts";

const apiUrl = "https://example.com";
const sdk = new LiteSdk(apiUrl);

Deno.test("class has API_URL prop", () => {
  assertEquals(sdk.apiUrl, apiUrl);
});

Deno.test("simple query path", () => {
  const result = "https://example.com/my/path";
  assertEquals(sdk.query("my/path"), result);
});

Deno.test("query with fields as string", () => {
  const result = "https://example.com/my/path?fields=uno,dos,tres.*";
  assertEquals(
    sdk.query("my/path", {
      fields: "uno,dos,tres.*",
    }),
    result,
  );
});

Deno.test("query with fields as string", () => {
  const expected =
    "?sort=-orden&search=text&limit=99&offset=4&page=44&export=json&meta=*";
  const result = getQueryParams({
    sort: "-orden",
    search: "text",
    limit: 99,
    offset: 4,
    page: 44,
    export: "json",
    meta: "*",
  });
  assertEquals(
    result,
    expected,
  );
});
