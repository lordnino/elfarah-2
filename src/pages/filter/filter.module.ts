import { SharedModule } from './../../providers/shared-module.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPage } from './filter';

@NgModule({
  declarations: [
    FilterPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPage),
    SharedModule
  ],
})
export class FilterPageModule {}
