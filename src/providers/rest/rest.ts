import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://automark.ae:3000/api';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getCategories() {
    console.log("4");
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/categories').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

 getcat_items(id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/cars?filter={"where":{"category_c":'+id+'}}').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
getcat_items_limit(id){ 
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/cars?filter={"where":{"category_c":'+id+'},"limit":3}').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

getcitiesRest(){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/cities').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

getcars_type(){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/cars_types').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
     
getcars_model(model){ 
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/option_cars?filter[include]=value_option&filter[where][id_o]='+model).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });    
}   
getitem_details(id){         
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/cars/cars_meta_option_by_id?id='+id+'&include=users').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
} 

get_filter_result(parameters){
  var request = this.apiUrl+'/cars/cars_advertisment?limit=5&offset=0';
  var staticf =   'static_filter=[';
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/cars/cars_advertisment?limit=5&offset=0&dynamic_filter=[{"op":"between","_1":1,"_2":100000000,"code_m":"transmission"}]&static_filter=[{"op":"like","option":"type_c","_1":'+parameters[2]+'},{"op":"like","option":"Country_c","_1":'+parameters[0]+'},{"op":"like","option":"city_c","_1":'+parameters[1]+'},{"op":"between","_1":1,"_2":50000,"option":"price_c"},{"op":"between","_1":1,"_2":50000,"option":"year_c"}]').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    }); 
  });
}
/*public get_Category_items(cat_id) {
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/categories/'+cat_id+'/cars').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}*/





}
