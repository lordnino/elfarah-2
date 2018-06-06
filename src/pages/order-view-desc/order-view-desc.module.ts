import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderViewDescPage } from './order-view-desc';

@NgModule({
  declarations: [
    OrderViewDescPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderViewDescPage),
  ],
})
export class OrderViewDescPageModule {}
