# directus-lite-sdk

The unofficial Directus Lite SDK in less than 1Kb

- ~750 bytes
- It works on the browser, Deno and Node.js
- Bring your own fetch

## Install

Node.js: `npm i directus-lite-sdk`

Deno: -- just import it on your file

## Usage

Create a new instance of the SDK passing the URL of your Directus API:

```js
// Deno
import DirectusLiteSdk from "https://deno.land/x/directus_lite_sdk/src/lite-sdk.ts";
// Node
import DirectusLiteSdk from "directus-lite-sdk";

const sdk = new DirectusLiteSdk("your-api-url.com");
```

This instance exposes 2 methods: `query` and `fileUrl`.

### `query`

Accepts 2 arguments: the path of your request, and an optional object containing
the global params, and the `access_token`:

```js
fetch(
  sdk.query("items/articles", {
    fields: [
      "id",
      "title",
      "author.name",
    ],
    search: "text",
    limit: 30,
    page: 4,
    filter: {
      project: {
        _eq: "lite-sdk",
      },
      "year(pubdate)": 2022,
    },
  }),
);
```

Query options:

```typescript
interface QueryOptions {
  access_token?: string;
  filter?: DeepParam;
  fields?: string | string[];
  sort?: string | string[];
  search?: string;
  limit?: number;
  offset?: number;
  page?: number;
  aggregate?: Record<string, string>;
  deep?: DeepParam;
  alias?: Record<string, string>;
  export?: "json" | "csv" | "xml";
  meta?: "total_count" | "filter_count" | "*";
}

interface DeepParam {
  [key: string]: string | number | DeepParam;
}
```

### `fileUrl`

Get the full path of a file. Receives the id of the file, and optionally 2 more
arguments, the first one is an object containing the `access_token` and custom
transformations; the second is an array containing the advanced transformations.

```js
const imageUrl = fileUrl(
  "1234-abcd",
  {
    fit: "cover",
    width: 100,
    format: "jpg",
  },
  [
    ["blur", 45],
    ["tint", "rgba(255, 0, 0)"],
  ]
);
```

FileUrl options:

```typescript
{
  access_token?: string;
  key?: string;
  fit?: "cover" | "contain" | "inside" | "outside";
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpg" | "png" | "webp" | "tiff";
}
```

## Test

Use Deno

```sh
deno test
```

© 2022 [Jacobo Tabernero Rey](https://github.com/jacoborus) - Released under
[MIT License](https://raw.github.com/jacoborus/hexterm/master/LICENSE)
