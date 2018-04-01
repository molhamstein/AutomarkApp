
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http.provider';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class AdvertismentProvider {
    constructor(public http: HttpProvider) {
        console.log('Hello RestProvider Provider');
    }

    getCarKeys() {
        
        let countriesAndCities = this.http.get('cities');
        let carTypes = this.http.get('cars_types');
        let carModels = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=16');
        let carStatus = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=22');
        let producationYear = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=20');
        let carColors = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=15');
        let kiloMeters = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=50');
        let carSpecs = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=13');
        let carGuarantee = this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]=61');

        let carKeysObservables = [
            countriesAndCities,
            carTypes,
            carModels,
            carStatus,
            producationYear,
            carColors,
            kiloMeters,
            carSpecs,
            carGuarantee
        ];

        return Observable.forkJoin(carKeysObservables);
    }

    postCarAdvertisment(carModel): Observable<any> {
        return null;
    }
}
