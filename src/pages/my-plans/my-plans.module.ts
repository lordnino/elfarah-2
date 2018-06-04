import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPlansPage } from './my-plans';

@NgModule({
  declarations: [
    MyPlansPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPlansPage),
  ],
})
export class MyPlansPageModule {}
