import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderViewDonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-view-done',
  templateUrl: 'order-view-done.html',
})
export class OrderViewDonePage {

  desc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.desc = this.navParams.get('data');
    console.log(this.desc);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderViewDonePage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
