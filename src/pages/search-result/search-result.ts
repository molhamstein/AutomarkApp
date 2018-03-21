import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SearchFilterPage } from '../search-filter/search-filter';
import { ItemDetailsPage } from '../item-details/item-details';
import { config } from '../../config';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  cat_id :any;
  items :any;
  items_count:any;
  city:any;
  filters:any;
  categoryName:any;
  assetsBaseUrl: any = config.assetsBaseUrl;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.cat_id= navParams.data.cat_id;
    this.city= navParams.data.city;
    this.filters = [
    navParams.data.city,
    navParams.data.country,
    navParams.data.type,
    navParams.data.model,
    navParams.data.status,
    navParams.data.from_year,
    navParams.data.to_year,
    navParams.data.from_price,
    navParams.data.to_price,
    navParams.data.from_kilom,
    navParams.data.to_kilom,
   /* navParams.data.doors,
    navParams.data.speceific,
    navParams.data.qarantee,*/
    ]; 
    console.log(this.filters);
  }

  ionViewDidLoad() {
    this.setCategoryMame();
  }
  ionViewCanEnter(){
    if (this.cat_id == -1){
      return  this.get_filter_result();
    }else{
      return this.getcatitems();
    }
        
  }

  setCategoryMame() {
    switch (this.cat_id) {
      case 1:
        this.categoryName = 'سيارة';
        break;
      case 2:
        this.categoryName = 'لوحة سيارة';
        break;
      case 3:
        this.categoryName = 'رقم موبايل';
        break;
      case 4:
        this.categoryName = 'دراجة';
        break;
      case 5:
        this.categoryName = 'قارب';
        break;
      case 6:
        this.categoryName = 'شاحنة';
        break;
      default:
        this.categoryName = 'سيارة';
        break;
    }
  }
  getcatitems(){
    console.log('ionViewDidLoad SearchResultPage'+this.cat_id);
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات ....'
    });
 
    // Show the popup
    loadingPopup.present();
    console.log("2");
    return  this.restProvider.getcat_items(this.cat_id)
    .then(data2 => { 
      this.items = data2;
      loadingPopup.dismiss();
      this.items_count = this.items.data.length;
      console.log(this.items);
      //alert(this.categories);
    });
  }
  get_filter_result(){
    //console.log('ionViewDidLoad SearchResultPage'+this.cat_id);
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات ....'
    });
 
    // Show the popup
    loadingPopup.present();
    console.log("2");
    return  this.restProvider.get_filter_result(this.filters)
    .then(data2 => { 
      this.items = data2;
      loadingPopup.dismiss();
      this.items_count = this.items.data.length;
      console.log(this.items);
      //alert(this.categories);
    });
  }

  ShowFilter(){
    this.navCtrl.push(SearchFilterPage);
  }

  ShowDetails(id){
    this.navCtrl.push(ItemDetailsPage,{item_id : id});
  }
} 
