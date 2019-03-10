type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class HttpClient {

    private readonly rootUrl = process.env.REACT_APP_schedules_root_url || '';

    public get(...parts: any[]): HttpRequestBuilder {
        return this.request(
            this.createPath(parts),
            'GET'
        );
    }

    public post(...parts: any[]): HttpRequestBuilder {
        return this.request(
            this.createPath(parts),
            'POST'
        );
    }

    public put(...parts: any[]): HttpRequestBuilder {
        return this.request(
            this.createPath(parts),
            'PUT'
        );
    }

    public delete(...parts: any[]): HttpRequestBuilder {
        return this.request(
            this.createPath(parts),
            'DELETE'
        );
    }

    private createPath(parts: any[]): string {
        return this.rootUrl + '/api/schedules/' + parts.map(part => part.toString()).join('/');
    }

    private request(path: string, method: HttpMethod): HttpRequestBuilder {
        return new HttpRequestBuilder(
            path, method
        );
    }

}

export class HttpRequestBuilder {

    private _body: string = '';

    private _headers: { [key: string]: string } = {};

    private _params: { [key: string]: string } = {};

    constructor(
        private readonly _path: string,
        private readonly method: HttpMethod
    ) { }

    public body(content: any): HttpRequestBuilder {
        this._body = JSON.stringify(content);
        return this;
    }

    public header(key: string, value: any): HttpRequestBuilder {
        this._headers[key] = value.toString();
        return this;
    }

    public param(key: string, value: any): HttpRequestBuilder {
        this._params[key] = value;
        return this;
    }

    private get path(): string {
        const query = Object.entries(this._params)
            .map(entry => encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1]))
            .join('&');
        if (query) {
            return this._path + '?' + query;
        } else {
            return this._path;
        }
    }

    private get options(): RequestInit {
        const options: RequestInit = {
            method: this.method
        };
        const headers = new Headers();
        Object.entries(this._headers).forEach(entry => headers.append(entry[0], entry[1]));
        if (this._body) {
            options.body = this._body;
            headers.append('Content-Type', 'application/json');
        }
        options.headers = headers;
        return options;
    }

    private async fetchResponse() {
        const response = await fetch(this.path, this.options);
        if (!response.ok) {
            throw 'Failed to call: ' + this.path + ' with status: ' + response.status;
        }
        return response;
    }

    public async execute<T>(): Promise<T> {
        const response = await this.fetchResponse();
        return response.json();
    }

    public async executeVoid(): Promise<any> {
        await this.fetchResponse();
    }

}

export const httpClient = new HttpClient();