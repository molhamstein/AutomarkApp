import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SearchResultPage } from '../search-result/search-result';
import { SearchFilterPage } from '../search-filter/search-filter';
import { ItemDetailsPage } from '../item-details/item-details';
import { MyAccountPage } from '../my-account/my-account';
import { AddAdvertismentPage } from '../add-advertisment/add-advertisment';
import { ShowroomPage } from '../showroom/showroom';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../auth/auth.provider';
import { ShowroomsPage } from '../showrooms/showrooms';
import { MyApp } from '../../app/app.component';
import { BaseComponent } from '../../components/base.component';
import { UiProvider } from '../../providers/ui.provider';
import { config } from '../../config';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  // provider : 'RestProvider'
})
export class ContactPage {
  categories: any;
  cars: any;
  cars_plate: any;
  mobile_number: any;
  motors: any;
  boat: any;
  trucks: any;
  loginStatus;

  assetsBaseUrl: any = config.assetsBaseUrl;
  dataFetched: boolean = false;

  homeData: any[] = [];

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    private loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public uiProvider: UiProvider
  ) {
    console.log("a sd");
  }
  ionViewDidLoad() {

  }

  ionViewCanEnter() {
    return this.getcategories();
  }
  getcategories() {
    // Create the popup
    // let loadingPopup = this.loadingCtrl.create({
    //   content: 'جاري جلب البيانات ....'
    // }); 

    // // Show the popup
    // loadingPopup.present();
    // console.log("2");
    // return this.restProvider.getCategories()
    // .then(data2 => {
    //   this.categories = data2;
    //   console.log(this.categories);
    //   return this.restProvider.getcat_items_limit(1)
    //   .then(data3 => {
    //     this.cars = data3;          
    //     console.log(this.cars);
    //     loadingPopup.dismiss();
    //   }); 
    // });
    this.uiProvider.showLoadingPopup("جاري جلب البيانات");
    this.restProvider.getCategoriesAsObservable()
      .subscribe(
        (result) => {
          this.categories = result.data;
          console.log(this.categories);
          this.homeData.push(...this.categories.map(cat => { return { catId: cat.id_ss, catName: cat.code_ss_ar } }));
          this.restProvider.homeData(this.categories)
            .subscribe(
              (result) => {
                this.uiProvider.hideLoadingPopup();
                console.log(this.homeData);                
                for (let index = 0; index < result.length; index++) {
                  this.homeData[index].data = result[index].data;
                }
                this.dataFetched = true;
              },
              (error) => {
                this.uiProvider.showToastMessage("حدث خطأ");
              }
            )
        },
        (error) => {
          this.uiProvider.showToastMessage("حدث خطأ");
        }
      )
    //console.log("3");  
  }

  ShowDetails(id) {
    this.navCtrl.push(ItemDetailsPage, { item_id: id });
  }
  showmore(id) {
    this.navCtrl.push(SearchResultPage, { cat_id: id });
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
