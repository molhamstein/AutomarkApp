import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SearchResultPage } from '../search-result/search-result';
import { SearchFilterPage } from '../search-filter/search-filter';
import { ItemDetailsPage } from '../item-details/item-details';
import { MyAccountPage } from '../my-account/my-account';
import { AddAdvertismentPage } from '../add-advertisment/add-advertisment';
import { ShowroomPage } from '../showroom/showroom';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../auth/auth.provider';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
// provider : 'RestProvider'
})
export class ContactPage {
  categories: any;
  cars:any;
  cars_plate:any; 
  mobile_number:any; 
  motors:any;
  boat:any;
  trucks:any;
  loginStatus;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, private loadingCtrl: LoadingController, public authProvider: AuthProvider) {
  	authProvider.isAuth.subscribe(
      (result) => {
        if(result == null) {
          this.loginStatus = this.authProvider.isLoggedIn();
        } else {
          this.loginStatus = result;
        }
      }
    );
    //for (var i = 0; i < categories.length; ++i) {
    //  //this.getcategory_content(categories[i].id_ss);
    //}
    console.log("a sd"); 
    //alert("this.categories");
  }   
  ionViewDidLoad() {
    
  }

  ionViewCanEnter(){
    return this.getcategories();
  }
   getcategories() {    

    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات ....'
    }); 
                      
   
    // Show the popup
    loadingPopup.present();
    console.log("2");
    return this.restProvider.getCategories()   
    .then(data2 => {
      this.categories = data2;
      return this.restProvider.getcat_items_limit(1)
      .then(data3 => {
        this.cars = data3;          
        console.log(this.cars);
        loadingPopup.dismiss();
      }); 
    });
    //console.log("3");  
  }
  
 
  showmore(id){
    this.navCtrl.push(SearchResultPage,{cat_id : id});
  } 
  ShowFilter(){
    this.navCtrl.push(SearchFilterPage);
  }
  ShowDetails(id){
    this.navCtrl.push(ItemDetailsPage,{item_id : id});
  }
  ShowMyAccount(){
     this.navCtrl.push(MyAccountPage);
  }

  add_ad(){
    this.navCtrl.push(AddAdvertismentPage);
  }
  
  showroom(){
    this.navCtrl.push(ShowroomPage);
  } 

  login(){
    this.navCtrl.push(LoginPage);
  }
 /* getcategory_content(cat_id){ 
    var cars = ["Saab", "Volvo", "BMW"];
    /*this.restProvider.get_Category_items(cat_id)
    .then(data => {
      items = data.data;

    });*/
    /*return cars;
  }*/

}
