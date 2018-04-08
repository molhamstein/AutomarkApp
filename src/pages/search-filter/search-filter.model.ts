import * as moment from "moment";

export class SearchCarModel {
    type: number;
    model: number;
    category: number;
    yearFrom: number;
    yearTo: number;
    country: number;
    city: number;
    priceFrom: any;
    priceTo: any;
    case: any;
    passedKiloetersFrom: any;
    passedKiloetersTo: any;
    transmission: any;
    fuel: any;
    carClass: any;
    supplier: any;
    cylindersNumber: any;

    constructor() {
        this.type = null;
        this.model = null;
        this.yearFrom = null;
        this.yearTo = null;
        this.country = null;
        this.city = null;
        this.priceFrom = null;
        this.priceTo = null;
        this.case = null;
        this.passedKiloetersFrom = null;
        this.passedKiloetersTo = null;
        this.transmission = null;
        this.fuel = null;
        this.carClass = null;
        this.supplier = null;
        this.cylindersNumber = null;
        this.category = 1;
    }
}
