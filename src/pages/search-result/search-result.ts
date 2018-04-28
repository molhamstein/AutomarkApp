import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";
import { SearchFilterPage } from "../search-filter/search-filter";
import { ItemDetailsPage } from "../item-details/item-details";
import { config } from "../../config";
import { UiProvider } from "../../providers/ui.provider";
import { SearchProvider } from "../../providers/search/search.provider";

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-search-result",
  templateUrl: "search-result.html"
})
export class SearchResultPage {
  cat_id: any;
  items: any;
  items_count: any;
  city: any;
  filters: any = {
    staticFilters: {},
    dynamicFilters: {}
  };
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
  }

  ionViewDidLoad() {
    this.setCategoryName();
    if (this.cat_id == -1) {
      this.searchType = 1;
      return this.getFiltersResults(5, 0);
    } else {
      this.searchType = 2;
      return this.getCategoryItems(5, 0);
    }
  }

  setCategoryName() {
    switch (this.cat_id) {
      case 1:
        this.categoryName = "سيارة";
        break;
      case 2:
        this.categoryName = "لوحة سيارة";
        break;
      case 3:
        this.categoryName = "رقم موبايل";
        break;
      case 4:
        this.categoryName = "دراجة";
        break;
      case 5:
        this.categoryName = "قارب";
        break;
      case 6:
        this.categoryName = "شاحنة";
        break;
      default:
        this.categoryName = "إعلان";
        break;
    }
  }

  getCategoryItems(limit, skip) {
    this.uiProvider.showLoadingPopup("جاري جلب البيانات");

    this.searchProvider.searchByCategory(this.cat_id, limit, skip).subscribe(
      result => {
        this.uiProvider.hideLoadingPopup();
        this.items != null
          ? this.items.push(...result.data)
          : (this.items = result.data);
        result.data.length == limit
          ? (this.canLoadMore = true)
          : (this.canLoadMore = false);
      },
      error => {
        this.uiProvider.hideLoadingPopup();
        this.uiProvider.showToastMessage(error);
      }
    );
  }

  getFiltersResults(limit, skip) {
    this.uiProvider.showLoadingPopup("جاري جلب البيانات");
    this.buildFiltersToApi();
    return this.searchProvider.searchByFilters(this.filters, 5, 0).subscribe(
      result => {
        this.uiProvider.hideLoadingPopup();
        this.items = result.data;
        this.items_count = this.items.length;
      },
      error => {
        this.uiProvider.hideLoadingPopup();
        this.uiProvider.showToastMessage(error.json().error.message);
      }
    );
  }

  buildFiltersToApi() {

    switch (this.navParams.data.category) {
      case 1:
        this.filters.staticFilters = {
          city: this.navParams.data.city,
          country: this.navParams.data.country,
          type: this.navParams.data.type,
          model: this.navParams.data.model,
          case: this.navParams.data.case,
          yearFrom: this.navParams.data.yearFrom,
          yearTo: this.navParams.data.yearTo,
          priceFrom: this.navParams.data.priceFrom,
          priceTo: this.navParams.data.priceTo,
          category: this.navParams.data.category,
          userId: this.navParams.data.userId
        };
        this.filters.dynamicFilters = {};
        break;
      case 2:
        this.filters.staticFilters = {
          priceFrom: this.navParams.data.priceFrom,
          priceTo: this.navParams.data.priceTo,
          category: this.navParams.data.category,
          userId: this.navParams.data.userId
        };
        this.filters.dynamicFilters = {
          carPalleteCategory: this.navParams.data.carPalleteCategory,
          symbol: this.navParams.data.symbol
        };
        break;
      case 3:
        this.filters.staticFilters = {
          category: this.navParams.data.category,
          userId: this.navParams.data.userId
        };
        this.filters.dynamicFilters = {
          companyProvider: this.navParams.data.companyProvider
        };
        break;
      case 4:
        this.filters.staticFilters = {
          city: this.navParams.data.city,
          country: this.navParams.data.country,
          yearFrom: this.navParams.data.yearFrom,
          yearTo: this.navParams.data.yearTo,
          priceFrom: this.navParams.data.priceFrom,
          priceTo: this.navParams.data.priceTo,
          category: this.navParams.data.category,
          userId: this.navParams.data.userId
        };
        this.filters.dynamicFilters = {
          color: this.navParams.data.color,
          fuel: this.navParams.data.fuel,
          bikeCase: this.navParams.data.bikeCase,
          enginePower: this.navParams.data.enginePower
        };
        break;
      case 5:
        this.filters.staticFilters = {
          city: this.navParams.data.city,
          country: this.navParams.data.country,
          yearFrom: this.navParams.data.yearFrom,
          yearTo: this.navParams.data.yearTo,
          priceFrom: this.navParams.data.priceFrom,
          priceTo: this.navParams.data.priceTo,
          category: this.navParams.data.category,
          userId: this.navParams.data.userId
        };
        this.filters.dynamicFilters = {
          loadQuantity: this.navParams.data.loadQuantity,
          boatCase: this.navParams.data.boatCase,
          color: this.navParams.data.color
        };
        break;
      case 6:
        this.filters.staticFilters = {
          city: this.navParams.data.city,
          country: this.navParams.data.country,
          yearFrom: this.navParams.data.yearFrom,
          yearTo: this.navParams.data.yearTo,
          priceFrom: this.navParams.data.priceFrom,
          priceTo: this.navParams.data.priceTo,
          category: this.navParams.data.category,
          userId: this.navParams.data.userId
        };
        this.filters.dynamicFilters = {
          loadQuantity: this.navParams.data.loadQuantity,
          transmission: this.navParams.data.transmission,
          color: this.navParams.data.color,
        };
        break;

      default:
        this.filters.staticFilters = {
          userId: this.navParams.data.userId
        };
        break;
    }
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
