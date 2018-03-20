import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpProvider } from '../http.provider';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello RestProvider Provider');
  }

  getCategories() {
    console.log("4");
  return new Promise(resolve => {
    this.http.get('categories').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

 getcat_items(id){
  return new Promise(resolve => {
    this.http.get('cars?filter={"where":{"category_c":'+id+'}}').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
getcat_items_limit(id){ 
  return new Promise(resolve => {
    this.http.get('cars?filter={"where":{"category_c":'+id+'},"limit":3}').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

getcitiesRest(){
  return new Promise(resolve => {
    this.http.get('cities').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

getcars_type(){
  return new Promise(resolve => {
    this.http.get('cars_types').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
     
getcars_model(model){ 
  return new Promise(resolve => {
    this.http.get('option_cars?filter[include]=value_option&filter[where][id_o]='+model).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });    
}   
/*getitem_details(id){         
  return new Promise(resolve => {
    this.http.get('cars/'+id).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
} */
getitem_details(id){         
  return new Promise(resolve => {
    this.http.get('cars/cars_meta_option_by_id?id='+id+'&include=users').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    }); 
  });
} 

get_filter_result(parameters){
  var request = 'cars/cars_advertisment?limit=5&offset=0';
  var staticf =   'static_filter=[';
  return new Promise(resolve => {
    this.http.get('cars/cars_advertisment?limit=5&offset=0&dynamic_filter=[{"op":"between","_1":1,"_2":100000000,"code_m":"transmission"}]&static_filter=[{"op":"like","option":"type_c","_1":'+parameters[2]+'},{"op":"like","option":"Country_c","_1":'+parameters[0]+'},{"op":"like","option":"city_c","_1":'+parameters[1]+'},{"op":"between","_1":1,"_2":50000,"option":"price_c"},{"op":"between","_1":1,"_2":50000,"option":"year_c"}]').subscribe(data => {
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
 

add_car(price,category,title,model,type,notes,
      kilom,
      status,
      manufactured,
      year,
      qrante,
      color,
      city,
      country,
      images_c){

  let data = JSON.stringify({
    "title_c": title,
    "type_c": type,
    "model_c": model,
    "category_c": category,
    "special_c": notes,
    "odometer_c": kilom,
    "status_c": status,
    "description_c": manufactured,
    "year_c": year,
    "color_c": color,
    "price_c": price,
    "Country_c": city,
    "city_c": country,
    "images_c" : JSON.stringify(images_c),
    //
    "end_c": 1519904500,
    "id_user": 40,
    "act_c": 1,
    "vzt_c": 97,
    "cars_meta":[
      {"code_m":"kilometersconsumed","value_m":kilom},
      {"code_m":"color","value_m":color},
      {"code_m":"specifications","value_m":notes},
      {"code_m":"status","value_m":status},
      {"code_m":"special_access","value_m":manufactured},
      {"code_m":"Country_c","value_m":country},
      {"code_m":"years","value_m":year}
      ]
  });

  return new Promise(resolve => {
    this.http.post('cars/', data)
    .subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    }); 
  });
}





}
