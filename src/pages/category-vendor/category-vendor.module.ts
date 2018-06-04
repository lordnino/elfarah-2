import { SharedModule } from './../../providers/shared-module.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryVendorPage } from './category-vendor';

@NgModule({
  declarations: [
    CategoryVendorPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryVendorPage),
    SharedModule
  ],
})
export class CategoryVendorPageModule {}
