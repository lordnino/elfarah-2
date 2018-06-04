import { SharedModule } from './../../providers/shared-module.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesDetailsPage } from './categories-details';

@NgModule({
  declarations: [
    CategoriesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesDetailsPage),
    SharedModule
  ],
})
export class CategoriesDetailsPageModule {}
