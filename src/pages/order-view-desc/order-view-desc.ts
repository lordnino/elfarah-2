import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderViewDescPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-view-desc',
  templateUrl: 'order-view-desc.html',
})
export class OrderViewDescPage {

  desc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.desc = this.navParams.get('data');
    console.log(this.desc);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderViewDescPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
