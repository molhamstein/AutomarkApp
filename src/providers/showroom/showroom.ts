
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http.provider';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ShowroomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShowroomProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello RestProvider Provider');
  }

  getShowrooms(filters): Observable<any> {
    let actionUrl = `shows?filter=${JSON.stringify(filters)}`;
    return this.http.get(actionUrl);
  }

  getShowroom(id): Observable<any> {
    let actionUrl = `api/shows/${id}`;
    return this.http.get(actionUrl)
            .map( res => res.json())
  }

}
