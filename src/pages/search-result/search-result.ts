import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SearchFilterPage } from '../search-filter/search-filter';
import { ItemDetailsPage } from '../item-details/item-details';
import { config } from '../../config';
import { UiProvider } from '../../providers/ui.provider';
import { SearchProvider } from '../../providers/search/search.provider';

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
  cat_id: any;
  items: any;
  items_count: any;
  city: any;
  filters: any;
  categoryName: any;
  assetsBaseUrl: any = config.assetsBaseUrl;
  canLoadMore: boolean = false;
  searchType;
  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    public uiProvider: UiProvider,
    public searchProvider: SearchProvider
  ) {

    this.cat_id = navParams.data.cat_id;
    this.city = navParams.data.city;

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
    if (this.cat_id == -1) {
      this.searchType = 1;
      return this.getFiltersResults();
    } else {
      this.searchType = 2;
      return this.getCategoryItems(5, 0);
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

  getCategoryItems(limit, skip) {

    this.uiProvider.showLoadingPopup('جاري جلب البيانات');

    this.searchProvider.searchByCategory(this.cat_id, limit, skip)
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          (this.items != null) ? this.items.push(...result.data) : this.items = result.data;
          (result.data.length == limit) ? this.canLoadMore = true : this.canLoadMore = false;
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
          this.uiProvider.showToastMessage(error);
        }
      );
  }

  getFiltersResults() {
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');

    return this.restProvider.get_filter_result(this.filters)
      .then(data2 => {
        this.items = data2;
        this.uiProvider.hideLoadingPopup();
        this.items_count = this.items.data.length;
      });
  }

  showMore() {
    switch (this.searchType) {
      case 1:
        this.getFiltersResults();
        break;
      case 2:
        this.getCategoryItems(5, this.items.length);
        break;
      default:
        break;
    }
  }

  ShowFilter() {
    this.navCtrl.push(SearchFilterPage);
  }

  ShowDetails(id) {
    this.navCtrl.push(ItemDetailsPage, { item_id: id });
  }
} 
