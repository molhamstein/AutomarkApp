
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http.provider';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello RestProvider Provider');
  }

  searchByCategory(catId, limit, skip): Observable<any> {
    const actionUrl =`cars?filter={"where":{"category_c":${catId}},"limit":${limit}, "offset": ${skip}}`;
      return this.http.get(actionUrl);
  }

  
}
