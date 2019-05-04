import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class UrlService {

    public buildUrl(...parts: any[]): string {
        return environment.apiUrl + parts.map(part => part.toString()).join('/');
    }

}
