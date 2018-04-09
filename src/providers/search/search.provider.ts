
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
    let searchOptions = this.buildSearchOptionsForCar(filters)
    const actionUrl = `cars/cars_advertisment?limit=${limit}&offset=${skip}&dynamic_filter=${searchOptions.dynamicFilter}&static_filter=${searchOptions.staticFilters}`;
    return this.http.get(actionUrl);
  }

  searchInShowroom(filters, limit, skip) {
    let searchOptions = this.buildSearchOptionsForShowroom(filters);
    const actionUrl = `cars/cars_advertisment?limit=${limit}&offset=${skip}&dynamic_filter=${searchOptions.dynamicFilter}&static_filter=${searchOptions.staticFilters}`;
    return this.http.get(actionUrl);
  }

  private buildSearchOptionsForCar(filters) {
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
          case "model":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "model_c", "_1": Number(filters.model) });
            }
            break;
          // case "case":
          //   if (value != null) {
          //     staticFilters.push({ "op": "like", "option": "case_c", "_1": Number(filters.case) });
          //   }
          //   break;
          case "yearFrom":
            if (value != null && filters["yearTo"] != null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.yearFrom), "_2": Number(filters.yearTo), "option": "year_c" });
            }
            if (value == null && filters["yearTo"] != null) {
              staticFilters.push(staticFilters.push({ "op": "between", "_1": 0, "_2": Number(filters.yearTo), "option": "year_c" }))
            }
            if (value != null && filters["yearTo"] == null) {
              staticFilters.push(staticFilters.push({ "op": "between", "_1": Number(filters.yearFrom), "_2": 100000000000, "option": "year_c" }))
            }
            break;

          case "priceFrom":
            if (value != null && filters["priceTo"] != null) {
              staticFilters.push({ "op": "between", "_1": Number(filters.priceFrom), "_2": Number(filters.priceTo), "option": "price_c" });
            }
            if (value == null && filters["pricceTo"] != null) {
              staticFilters.push(staticFilters.push({ "op": "between", "_1": 0, "_2": Number(filters.priceTo), "option": "price_c" }))
            }
            if (value != null && filters["priceTo"] == null) {
              staticFilters.push(staticFilters.push({ "op": "between", "_1": Number(filters.priceFrom), "_2": 100000000000, "option": "price_c" }))
            }
            break;
          case "country":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "Country_c", "_1": Number(filters.country) });
            }
            break;
          case "city":
            if (value != null) {
              staticFilters.push({ "op": "like", "option": "city_c", "_1": Number(filters.city) });
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
