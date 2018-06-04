import { VendorsProvider } from './../../providers/vendors/vendors';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  token: any = window.localStorage.getItem('token');
  statistics: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vendorsProvider: VendorsProvider, private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
    this.getVendors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

  getVendors() {
    let payload = { "custom": "true", "action": "Vendor_Statistics", "token":  this.token}
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendorsProvider.getStatistics(payload).subscribe((res: any) => {
      this.statistics = res.data;
    }, err => console.log(err)
    , () => loading.dismiss());
  }

}
