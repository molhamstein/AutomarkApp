
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { includes } from 'lodash';
import { HttpProvider } from './http.provider';

@Injectable()
export class SelectsOptionsProvider {
    constructor(public http: HttpProvider) {
    }

    getCarOptions(options) {
        let neededOptions = [21,22,31,36,37,45];
        let carOptionsArray = options.filter( option => {return includes(neededOptions, option.id_o)});
        let carOptions = {};
        for (let index = 0; index < carOptionsArray.length; index++) {
            carOptions[carOptionsArray[index]["code_o"]] = carOptionsArray[index];
        }
        return carOptions;
    }

    getBoatSelectOptions(options) {
        let neededOptions = [51, 55, 54, 53, 52, 22, 36, 15];
        let boatOptionsArray = options.filter( option => {return includes(neededOptions, option.id_o)});
        let boatOptions = {};
        for (let index = 0; index < boatOptionsArray.length; index++) {
            boatOptions[boatOptionsArray[index]["code_o"]] = boatOptionsArray[index];
        }
        return boatOptions;
    }

    getTruckSelectOptions(options) {
        let neededOptions = [51, 21, 15, 45, 52, 36, 22, 56];
        let truckOptionsArray = options.filter( option => {return includes(neededOptions, option.id_o)});
        let truckOptions = {};
        for (let index = 0; index < truckOptionsArray.length; index++) {
            truckOptions[truckOptionsArray[index]["code_o"]] = truckOptionsArray[index];
        }
        return truckOptions;
    }

    getBikeSelectOptions(options) {
        let neededOptions = [15, 36, 57, 45, 22, 52];
        let bikeOptionsArray = options.filter( option => {return includes(neededOptions, option.id_o)});
        let bikeOptions = {};
        for (let index = 0; index < bikeOptionsArray.length; index++) {
            bikeOptions[bikeOptionsArray[index]["code_o"]] = bikeOptionsArray[index];
        }
        return bikeOptions;
    }

    getMobileNumberSelectOptions(options) {
        let neededOptions = [61,47];
        let mobileOptionsArray = options.filter( option => {return includes(neededOptions, option.id_o)});
        let mobileOptions = {};
        for (let index = 0; index < mobileOptionsArray.length; index++) {
            mobileOptions[mobileOptionsArray[index]["code_o"]] = mobileOptionsArray[index];
        }
        return mobileOptions;
    }

    getCarPalleteSelectOptions(options) {
        let neededOptions = [59, 60,46];
        let carPalleteOptionsArray = options.filter( option => {return includes(neededOptions, option.id_o)});
        let carPalleteOptions = {};
        for (let index = 0; index < carPalleteOptionsArray.length; index++) {
            carPalleteOptions[carPalleteOptionsArray[index]["code_o"]] = carPalleteOptionsArray[index];
        }
        return carPalleteOptions;
    }
}
