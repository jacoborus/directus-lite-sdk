interface QueryParams {
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

type SimpleParam = typeof simpleParams[number];
type DeepParamName = typeof deepParams[number];
type StrArrParam = typeof strArrParams[number];

const strArrParams = ["fields", "sort"] as const;
const simpleParams = [
  "access_token",
  "search",
  "limit",
  "offset",
  "page",
  "export",
  "meta",
] as const;
const deepParams = ["filter", "deep"] as const;
const recordParams = ["aggregate", "alias"] as ["aggregate", "alias"];

interface FileOptions {
  access_token?: string;
  key?: string;
  fit?: "cover" | "contain" | "inside" | "outside";
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpg" | "png" | "webp" | "tiff";
}

const fileOptionNames = [
  "access_token",
  "key",
  "fit",
  "width",
  "height",
  "quality",
  "format",
] as const;

type AdvancedTransformations = [string, unknown][];

export class LiteSdk {
  readonly apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
  query(path: string, params?: QueryParams) {
    const queryString = getQueryParams(params);
    return `${this.apiUrl}/${path}${queryString}`;
  }
  fileUrl(
    id: string,
    options = {} as FileOptions,
    advanced = [] as AdvancedTransformations,
  ): string {
    const transforms = advanced.length
      ? ["transforms=" + JSON.stringify(advanced)]
      : [];
    const params = transforms.concat(
      fileOptionNames.filter((name) => name in options).map(
        (name) => `${name}=${options[name]}`,
      ),
    );
    const strParams = params.length ? `?${params.join("&")}` : "";
    return `${this.apiUrl}/assets/${id}${strParams}`;
  }
}

export function getQueryParams(options?: QueryParams): string {
  const opts = options || ({} as QueryParams);
  const query = [
    ...strArrParams.map(renderStrArray),
    ...simpleParams.map(renderSimpleParam),
    ...deepParams.map(renderDeep),
    ...recordParams.map(renderRecord),
  ]
    .filter((x) => x)
    .join("&");
  return query ? "?" + query : "";

  function renderSimpleParam(name: SimpleParam): string {
    return opts[name] ? `${name}=${opts[name]}` : "";
  }

  function renderStrArray(name: StrArrParam): string {
    const value = opts[name];
    return !value
      ? ""
      : `${name}=${Array.isArray(value) ? value.join(",") : value}`;
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

export default LiteSdk;
