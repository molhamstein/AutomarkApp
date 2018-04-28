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

export class SearchBikeModel {
  color: number;
  fuel: number;
  bikeCase: number;
  enginePower: number;
  city: number;
  country: number;
  yearFrom: number;
  yearTo: number;
  category: number;
  priceFrom: number;
  priceTo: number;

  constructor() {
    this.color = null;
    this.fuel = null;
    this.bikeCase = null;
    this.enginePower = null;
    this.city = null;
    this.country = null;
    this.yearFrom = null;
    this.yearTo = null;
    this.category = 4;
    this.priceFrom = null;
    this.priceTo = null;
  }
}

export class SearchTruckModel {
  loadQuantity: number;
  transmission: number;
  color: number;
  city: number;
  country: number;
  yearFrom: number;
  yearTo: number;
  category: number;
  priceFrom: number;
  priceTo: number;

  constructor() {
    this.loadQuantity = null;
    this.transmission = null;
    this.color = null;
    this.city = null;
    this.country = null;
    this.yearFrom = null;
    this.yearTo = null;
    this.category = 6;
    this.priceFrom = null;
    this.priceTo = null;
  }
}

export class SearchBoatModel {
  loadQuantity: number;
  boatCase: number;
  color: number;
  city: number;
  country: number;
  yearFrom: number;
  yearTo: number;
  category: number;
  priceFrom: number;
  priceTo: number;

  constructor() {
    this.loadQuantity = null;
    this.boatCase = null;
    this.color = null;
    this.city = null;
    this.country = null;
    this.yearFrom = null;
    this.yearTo = null;
    this.category = 5;
    this.priceFrom = null;
    this.priceTo = null;
  }
}

export class SearchMobileNumberModel {
  companyProvider: number
  category: number;

  constructor() {
    this.companyProvider = null;
    this.category = 3;
  }
}

export class SearchCarPalleteModel {
  carPalleteCategory: number;
  symbol: number;
  priceFrom: number;
  priceTo: number;
  category: number;

  constructor() {
    this.carPalleteCategory = null;
    this.symbol = null;
    this.priceFrom = null;
    this.priceTo = null;
    this.category = 2;
  }
}
