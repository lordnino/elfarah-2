import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
  ],
  imports: [
    Ionic2RatingModule // Put ionic2-rating module here
  ],
  exports: [
    Ionic2RatingModule // Put ionic2-rating module here
  ]
})
export class SharedModule {}
