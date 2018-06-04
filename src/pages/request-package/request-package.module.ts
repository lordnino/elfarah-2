import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestPackagePage } from './request-package';

@NgModule({
  declarations: [
    RequestPackagePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestPackagePage),
  ],
})
export class RequestPackagePageModule {}
