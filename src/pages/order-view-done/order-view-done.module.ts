import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderViewDonePage } from './order-view-done';

@NgModule({
  declarations: [
    OrderViewDonePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderViewDonePage),
  ],
})
export class OrderViewDonePageModule {}
