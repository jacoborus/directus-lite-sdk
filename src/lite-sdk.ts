export class LiteSdk {
  apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  query(path: string) {
    return `${this.apiUrl}/${path}`;
  }
}

export default LiteSdk;
