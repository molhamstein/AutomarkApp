
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http.provider';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello RestProvider Provider');
  }

  searchByCategory(catId, limit, skip): Observable<any> {
    const actionUrl = `cars?filter={"where":{"category_c":${catId}},"limit":${limit}, "offset": ${skip}}`;
    return this.http.get(actionUrl);
  }

  searchByFilters(filters, limit, skip): Observable<any> {
    let searchOptions = this.buildSearchOptions(filters)
    const actionUrl = `cars/cars_advertisment?limit=${limit}&offset=${skip}&dynamic_filter=${searchOptions.dynamicFilter}&static_filter=${searchOptions.staticFilters}`;
    return this.http.get(actionUrl);
  }

  searchInShowroom(filters, limit, skip) {
    let searchOptions = this.buildSearchOptionsForShowroom(filters);
    const actionUrl = `cars/cars_advertisment?limit=${limit}&offset=${skip}&dynamic_filter=${searchOptions.dynamicFilter}&static_filter=${searchOptions.staticFilters}`;
    return this.http.get(actionUrl);
  }

  private buildSearchOptions(filters) {
    let staticFilters = [];
    let dynamicFilter = [];

    for (var key in filters.staticFilters) {
      if (filters.staticFilters.hasOwnProperty(key)) {
        var value = filters.staticFilters[key];
        switch (key) {
          case "type":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "type_c", "_1": Number(filters.staticFilters.type) });
            }
            break;
          case "model":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "model_c", "_1": Number(filters.staticFilters.model) });
            }
            break;
          case "category":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "category_c", "_1": Number(filters.staticFilters.category) });
            }
            break;
          case "yearFrom":
            if (value != null && filters["yearTo"] != null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.staticFilters.yearFrom), "_2": Number(filters.staticFilters.yearTo), "option": "year_c" });
            }
            if (value == null && filters.staticFilters["yearTo"] != null) {
              staticFilters.push({ "op": "between", "_1": 0, "_2": Number(filters.staticFilters.yearTo), "option": "year_c" });
            }
            if (value != null && filters.staticFilters["yearTo"] == null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.staticFilters.yearFrom), "_2": 100000000000, "option": "year_c" });
            }
            break;

          case "priceFrom":
            if (value != null && filters.staticFilters["priceTo"] != null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.staticFilters.priceFrom), "_2": Number(filters.staticFilters.priceTo), "option": "price_c" });
            }
            if (value == null && filters["pricceTo"] != null) {
              staticFilters.push({ "op": "between", "_1": 0, "_2": Number(filters.staticFilters.priceTo), "option": "price_c" });
            }
            if (value != null && filters.staticFilters["priceTo"] == null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.staticFilters.priceFrom), "_2": 100000000000, "option": "price_c" });
            }
            break;
          case "country":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "Country_c", "_1": Number(filters.staticFilters.country) });
            }
            break;
          case "city":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "city_c", "_1": Number(filters.staticFilters.city) });
            }
            break;
          case "userId":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "id_user", "_1": Number(filters.staticFilters.userId) });
            }
            break;

          default:
            break;
        }
      }
    }
    for (var key in filters.dynamicFilters) {
      if (filters.dynamicFilters.hasOwnProperty(key)) {
        var value = filters.dynamicFilters[key];

        switch (key) {
          case "fuel":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "fuel", "_1": Number(filters.dynamicFilters.fuel) });
            }
            break;
          case "bikeCase":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "bikecase", "_1": Number(filters.dynamicFilters.bikeCase) });
            }
            break;
          case "enginePower":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "enginepower", "_1": Number(filters.dynamicFilters.enginePower) });
            }
            break;
          case "transmission":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "transmission", "_1": Number(filters.dynamicFilters.transmission) });
            }
            break;
          case "loadQuantity":
            if (value != null ) {
              dynamicFilter.push({ "op": "like", "code_m": "howmuchload", "_1": Number(filters.dynamicFilters.loadQuantity) });
            }
            break;
          case "boatCase":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "thecaseoftheboat", "_1": Number(filters.dynamicFilters.boatCase) });
            }
            break;
          case "color":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "color", "_1": Number(filters.dynamicFilters.color) });
            }
            break;
          case "companyProvider":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "the_company_provided_the_service", "_1": Number(filters.dynamicFilters.companyProvider) });
            }
            break;
          case "carPalleteCategory":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "category", "_1": Number(filters.dynamicFilters.carPalleteCategory) });
            }
            break;
          case "symbol":
            if (value != null) {
              dynamicFilter.push({ "op": "like", "code_m": "symbol", "_1": Number(filters.dynamicFilters.symbol) });
            }
            break;

          default:
            break;
        }
      }
    }
    return { staticFilters: JSON.stringify(staticFilters), dynamicFilter: JSON.stringify(dynamicFilter) };
  }

  private buildSearchOptionsForShowroom(filters) {
    let staticFilters = [];
    let dynamicFilter = [{ "op": "between", "_1": 1, "_2": 100000000, "code_m": "transmission" }]
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
        var value = filters[key];
        switch (key) {
          case "type":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "type_c", "_1": Number(filters.type) });
            }
            break;
          case "showroom":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "shows_c", "_1": Number(filters.showroom) });
            }
            break;
          case "model":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "model_c", "_1": Number(filters.model) });
            }
            break;
          case "yearFrom":
            if (value != null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.yearFrom), "_2": 100000000000, "option": "year_c" });
            }
            break;
          default:
            break;
        }
      }
    }
    return { staticFilters: JSON.stringify(staticFilters), dynamicFilter: JSON.stringify(dynamicFilter) };
  }

}
