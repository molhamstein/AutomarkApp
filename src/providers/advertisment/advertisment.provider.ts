
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http.provider';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class AdvertismentProvider {
    constructor(public http: HttpProvider) {
        console.log('Hello RestProvider Provider');
    }

    getSelectOptions() {
        
        let countriesAndCities = this.http.get('cities');
        let carTypes = this.http.get('cars_types');
        let selectOptions = this.http.get('option_cars?filter[include]=value_option');

        let optionsObservables = [
            countriesAndCities,
            carTypes,
            selectOptions
        ];

        return Observable.forkJoin(optionsObservables);
    }

    postCarAdvertisment(data): Observable<any> {
        return this.http.post('cars', data);
    }
}
