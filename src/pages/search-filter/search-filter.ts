import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';
import { SelectsOptionsProvider } from '../../providers/select-options.provider';
import { UiProvider } from '../../providers/ui.provider';
import { SearchCarModel } from "./search-filter.model";
import { AdvertismentProvider } from '../../providers/advertisment/advertisment.provider';
import * as moment from 'moment';

@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html',
})
export class SearchFilterPage {
  searchCarModel: SearchCarModel;
  searchCarSelectOptions: any;
  activeTab = 1;

  countries: any[];
  cities: any[];
  types: any[];
  models: any[];
  years: any[] = [];
  metaDataLoaded: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public selectOptionsProvider: SelectsOptionsProvider,
    public uiProvider: UiProvider,
    public advertismentProvider: AdvertismentProvider
  ) { }

  ionViewDidLoad() {
    this.searchCarModel = new SearchCarModel();
    this.getSelectMenusOptions();
  }

  setActiveTab(index) {
    //Should Be Implemented to Add Search for Other types
  }

  getSelectMenusOptions() {
    // Get Remote Options from API and filter them
    this.uiProvider.showLoadingPopup("جاري جلب البيانات");
    this.advertismentProvider.getSelectOptions()
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          this.searchCarSelectOptions = this.selectOptionsProvider.getCarOptions(result[2].data);
          this.countries = result[0].data;
          this.cities = result[0].data;
          this.types = result[1].data;
          this.models = result[1].data;
          this.metaDataLoaded = true;
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
        }
      );

    // Generate Years
    let startYear = Number(moment().subtract('50', 'years').format('YYYY'));
    for (let index = 0; index <= 50; index++) {
      this.years.push(startYear + index);
    }
  }

  searchCar(form) {
    console.log(this.searchCarModel);
    this.navCtrl.push(SearchResultPage,
      {
        cat_id: -1,
        city: this.searchCarModel.city,
        country: this.searchCarModel.country,
        type: this.searchCarModel.type,
        model: this.searchCarModel.model,
        case: this.searchCarModel.case,
        yearFrom: this.searchCarModel.yearFrom,
        yearTo: this.searchCarModel.yearTo,
        priceFrom: this.searchCarModel.priceFrom,
        priceTo: this.searchCarModel.priceTo,
        passedKiloetersFrom: this.searchCarModel.passedKiloetersFrom,
        passedKiloetersTo: this.searchCarModel.passedKiloetersTo
      });
  }
}
