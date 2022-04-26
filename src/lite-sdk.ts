interface QueryParams {
  filter?: DeepParam;
  fields?: string | string[];
  sort?: string;
  search?: string;
  limit?: string | number;
  offset?: string | number;
  page?: string | number;
  aggregate?: Record<string, string>;
  deep?: DeepParam;
  alias?: Record<string, string>;
  export?: "json" | "csv" | "xml";
  meta?: string;
}

interface DeepParam {
  [key: string]: string | number | DeepParam;
}

type SimpleParam = typeof simpleParams[number];
type DeepParamName = typeof deepParams[number];

const simpleParams = [
  "sort",
  "search",
  "limit",
  "offset",
  "page",
  "export",
  "meta",
] as const;
const deepParams = ["filter", "deep"] as const;
const recordParams = ["aggregate", "alias"] as ["aggregate", "alias"];

export function getQueryParams(options?: QueryParams): string {
  const opts = options || ({} as QueryParams);
  const query = [
    renderFields(),
    ...simpleParams.map((name) => renderSimpleParam(name)),
    ...deepParams.map((name) => renderDeep(name)),
    ...recordParams.map((name) => renderRecord(name)),
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

  function renderRecord(name: "aggregate" | "alias"): string {
    const records = opts[name];
    return !records ? "" : Object.keys(records)
      .map((key) => `${name}[${key}]=${records[key]}`)
      .join("&");
  }
}

export class LiteSdk {
  readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  query(path: string, params?: QueryParams) {
    const queryString = getQueryParams(params);
    return `${this.apiUrl}/${path}${queryString}`;
  }
}

export default LiteSdk;
