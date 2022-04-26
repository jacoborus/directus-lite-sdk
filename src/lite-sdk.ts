interface QueryParams {
  filter?: DeepParam;
  fields?: string | string[];
  sort?: string;
  search?: string;
  limit?: string | number;
  offset?: string | number;
  page?: string | number;
  deep?: DeepParam;
  export?: "json" | "csv" | "xml";
  meta?: string;
}

interface DeepParam {
  [key: string]: string | number | DeepParam;
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

const deepParams = ["filter", "deep"] as const;
type DeepParamName = typeof deepParams[number];

export function getQueryParams(options?: QueryParams): string {
  const opts = options || ({} as QueryParams);
  const query = [
    renderFields(),
    ...simpleParams.map((name) => renderSimpleParam(name)),
    ...deepParams.map((name) => renderDeep(name)),
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

  function renderDeep(name: DeepParamName): string {
    return opts[name] ? `${name}=${JSON.stringify(opts[name])}` : "";
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
