interface QueryParams {
  fields?: string | string[];
  sort?: string;
  search?: string;
  limit?: string | number;
  offset?: string | number;
  page?: string | number;
  export?: "json" | "csv" | "xml";
  meta?: string;
}

const simpleParams = [
  "sort",
  "search",
  "limit",
  "offset",
  "page",
  "export",
  "meta",
] as const;
type SimpleParam = typeof simpleParams[number];

export function getQueryParams(options?: QueryParams): string {
  const opts = options || ({} as QueryParams);
  const query = [
    renderFields(),
    ...simpleParams.map((name) => renderSimpleParam(name)),
  ]
    .filter((x) => x)
    .join("&");
  return query ? "?" + query : "";

  function renderSimpleParam(name: SimpleParam): string {
    return opts[name] ? `${name}=${opts[name]}` : "";
  }

  function renderFields() {
    const fields = opts.fields;
    return !fields ? "" : `fields=${fields}`;
  }
}

export class LiteSdk {
  apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  query(path: string, params?: QueryParams) {
    const queryString = getQueryParams(params);
    return `${this.apiUrl}/${path}${queryString}`;
  }
}

export default LiteSdk;
