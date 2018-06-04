import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPackagesPage } from './all-packages';

@NgModule({
  declarations: [
    AllPackagesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPackagesPage),
  ],
})
export class AllPackagesPageModule {}
