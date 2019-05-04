import {HttpClient} from '@angular/common/http';
import {BaseData} from './data';
import {UrlService} from './url';

export abstract class BaseDataService<T extends BaseData> {

    protected constructor(
        protected readonly client: HttpClient,
        protected readonly urlService: UrlService,
        protected readonly baseUrl: string
    ) { }

    public get(id: number): Promise<T> {
        return this.client.get<T>(
            this.url(id)
        ).toPromise();
    }

    public create(data: T): Promise<T> {
        return this.client.post<T>(
            this.url(),
            data
        ).toPromise();
    }

    public update(id: number, data: T): Promise<T> {
        return this.client.put<T>(
            this.url(id),
            data
        ).toPromise();
    }

    public save(data: T): Promise<T> {
        if (data.id) {
            return this.update(data.id, data);
        } else {
            return this.create(data);
        }
    }

    public delete(data: T): Promise<any> {
        return this.client.delete(
            this.url(data.id)
        ).toPromise();
    }

    protected url(...sections: any[]): string {
        return this.urlService.buildUrl(this.baseUrl, ...sections);
    }

}

export abstract class BaseCatalogService<T extends BaseData> extends BaseDataService<T> {

    public selectAll(): Promise<T[]> {
        return this.client.get<T[]>(
            this.url()
        ).toPromise();
    }

}
