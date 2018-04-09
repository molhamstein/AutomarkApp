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

    this.filters = {
      city: navParams.data.city,
      country: navParams.data.country,
      type: navParams.data.type,
      model: navParams.data.model,
      case: navParams.data.case,
      yearFrom: navParams.data.yearFrom,
      yearTo: navParams.data.yearTo,
      priceFrom: navParams.data.priceFrom,
      priceTo: navParams.data.priceTo,
      passedKiloetersFrom: navParams.data.passedKiloetersFrom,
      passedKiloetersTo: navParams.data.passedKiloetersTo,
    }
  }

  ionViewDidLoad() {
    this.setCategoryMame();
    if (this.cat_id == -1) {
      this.searchType = 1;
      console.log("in get filtger result");
      console.log(this.filters);
      return this.getFiltersResults(5, 0);
    } else {
      this.searchType = 2;
      console.log("in get categories");
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

  getFiltersResults(limit, skip) {
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');

    return this.searchProvider.searchByFilters(this.filters, 5, 0)
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          this.items = result.data;
          this.items_count = this.items.length;
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
          this.uiProvider.showToastMessage(error.json().error.message);
          console.log(error.json().error.message);
        }
      );
  }

  showMore() {
    switch (this.searchType) {
      case 1:
        this.getFiltersResults(5, this.items.length);
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
