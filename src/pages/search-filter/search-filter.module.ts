import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFilterPage } from './search-filter';

@NgModule({
  declarations: [
    SearchFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchFilterPage),
  ],
})
export class SearchFilterPageModule {}
