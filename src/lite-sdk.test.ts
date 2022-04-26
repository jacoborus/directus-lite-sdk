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

Deno.test("query with filter and deep", () => {
  const expected =
    '?filter={"project":{"_eq":"lite-sdk"},"year(pubdate)":2022}' +
    '&deep={"translations":{"_filter":{"languages_code":{"_eq":"en-ES"}}}}';
  const result = getQueryParams({
    filter: {
      project: {
        _eq: "lite-sdk",
      },
      "year(pubdate)": 2022,
    },
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _eq: "en-ES",
          },
        },
      },
    },
  });
  assertEquals(
    result,
    expected,
  );
});

Deno.test("query with filter and deep", () => {
  const expected = "?aggregate[avg]=cost" +
    "&alias[all_translations]=translations&alias[dutch_translations]=translations2";
  const result = getQueryParams({
    aggregate: {
      avg: "cost",
    },
    alias: {
      "all_translations": "translations",
      "dutch_translations": "translations2",
    },
  });
  assertEquals(
    result,
    expected,
  );
});

Deno.test("query fields and sort as arrays", () => {
  const expected = "?fields=name,age,other.*" +
    "&sort=-name,age";
  const result = getQueryParams({
    sort: ["-name", "age"],
    fields: ["name", "age", "other.*"],
  });
  assertEquals(
    result,
    expected,
  );
});

Deno.test("query accept access_token", () => {
  const expected = "?fields=name,age,other.*" +
    "&access_token=1234abcd";
  const result = getQueryParams({
    access_token: "1234abcd",
    fields: ["name", "age", "other.*"],
  });
  assertEquals(
    result,
    expected,
  );
});

Deno.test("file", () => {
  const expected = "https://example.com/assets/123456";
  const result = sdk.file("123456");
  assertEquals(
    result,
    expected,
  );
});

Deno.test("file accept access_token", () => {
  const expected = "https://example.com/assets/123456?access_token=1234abcd";
  const result = sdk.file("123456", { access_token: "1234abcd" });
  assertEquals(
    result,
    expected,
  );
});

Deno.test("file accept key", () => {
  const expected = "https://example.com/assets/123456?key=abcd";
  const result = sdk.file("123456", { key: "abcd" });
  assertEquals(
    result,
    expected,
  );
});

Deno.test("file accept custom transformations", () => {
  const expected = "https://example.com/assets/123456?" +
    "fit=cover&width=100&height=99&quality=66&format=jpg";
  const result = sdk.file("123456", {
    fit: "cover",
    width: 100,
    height: 99,
    quality: 66,
    format: "jpg",
  });
  assertEquals(
    result,
    expected,
  );
});
