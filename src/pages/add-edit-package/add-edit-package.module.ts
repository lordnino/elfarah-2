import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditPackagePage } from './add-edit-package';

@NgModule({
  declarations: [
    AddEditPackagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditPackagePage),
  ],
})
export class AddEditPackagePageModule {}
