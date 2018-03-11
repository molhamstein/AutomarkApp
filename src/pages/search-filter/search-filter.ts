import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SearchResultPage } from '../search-result/search-result';
/**
 * Generated class for the SearchFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html',
})
export class SearchFilterPage { 
	cities:any; 
  carstype:any; 
  carsmodels:any;
  carsstatus:any; 
  years:any;
  prices:any;
  kilomtrat:any;
  specifications:any; 
  qarante:any;


 city :any;
 country :any;
 type:any;
 model :any;
 status :any;
 from_year :any;
 to_year :any;
 from_price:any;
 to_price :any;
 from_kilom :any;
 to_kilom :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider, private loadingCtrl: LoadingController) {
  	//console.log(this.cities);
    
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFilterPage');
   
    
       }

       ionViewCanEnter(){
         return  this.getselects();
       }
    
  getselects(){
           
  	// Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات .....'
    }); 
    // Show the popup 
    loadingPopup.present();
    return this.restProvider.getcitiesRest() 
    .then(data2 => { 
      this.cities = data2; 
      console.log(this.cities);
      return this.restProvider.getcars_type()
      .then(data => {
        this.carstype = data;
        console.log(this.carstype);
        return this.restProvider.getcars_model(16)
        .then(data => {  
          this.carsmodels = data;
          console.log(this.carsmodels);
          return this.restProvider.getcars_model(22) 
          .then(data => {
            this.carsstatus = data;
            console.log(this.carsstatus);
            return this.restProvider.getcars_model(20) 
            .then(data => {
              this.years = data;
              console.log(this.years);
              return this.restProvider.getcars_model(24) 
              .then(data => {
                this.prices = data;
                console.log(this.prices);
                return this.restProvider.getcars_model(50) 
                .then(data => {
                  this.kilomtrat = data;
                  console.log(this.kilomtrat);
                  return this.restProvider.getcars_model(13) 
                  .then(data => {
                    this.specifications = data;
                    console.log(this.specifications);
                    return this.restProvider.getcars_model(61) 
                    .then(data => {
                      this.qarante = data;
                      console.log(this.qarante);
                      loadingPopup.dismiss();
                    });
                    //loadingPopup.dismiss();
                  });
                  //loadingPopup.dismiss();
                });
                //loadingPopup.dismiss();
              });
              //loadingPopup.dismiss();
            });
            //loadingPopup.dismiss();
          });
          //loadingPopup.dismiss();
        });
        //loadingPopup.dismiss();
      });
       //loadingPopup.dismiss();
    }); 
  } 

  onsubmit(){
    /*console.log(this.city);
    console.log(this.country);
    console.log(this.type);
    console.log(this.model);
    console.log(this.status);
    console.log(this.from_year);
    console.log(this.to_year);
    console.log(this.from_price);
    console.log(this.to_price);
    console.log(this.from_kilom);
    console.log(this.to_kilom);
    console.log(this.doors);
    console.log(this.speceific);
    console.log(this.qarantee);*/
    this.navCtrl.push(SearchResultPage,{cat_id :-1,
                                         city : this.city,
                                         country : this.country,
                                         type : this.type,
                                         model : this.model,
                                         status : this.status,
                                         from_year : this.from_year,
                                         to_year : this.to_year,
                                         from_price : this.from_price,
                                         to_price :this.to_price,
                                         from_kilom : this.from_kilom,
                                         to_kilom : this.to_kilom
                                         /*doors : this.doors,
                                         speceific : this.speceific,
                                         qarantee : this.qarantee*/
                                                  });
  }
  /*getcars_type(){
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات .....'
    }); 
    // Show the popup
    loadingPopup.present();
    return this.restProvider.getcars_type()
    .then(data => {
      this.carstype = data;
      console.log(this.carstype);
      loadingPopup.dismiss();
    });
  }*/

  onChange(){

  }
     

}
