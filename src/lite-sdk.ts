interface QueryParams {
  fields?: string | string[];
}

function getQueryParams(options?: QueryParams): string {
  const opts = options || ({} as QueryParams);
  function renderFields() {
    const fields = opts.fields;
    return !fields ? "" : `fields=${fields}`;
  }
  const query = [
    renderFields(),
  ]
    .filter((x) => x)
    .join("&");
  return query ? "?" + query : "";
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
