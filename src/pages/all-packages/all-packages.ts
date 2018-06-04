import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AllPackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-packages',
  templateUrl: 'all-packages.html',
})
export class AllPackagesPage {

  cat_details_id: any = window.localStorage.getItem('cat_id');
  cat_details: any;
  vendorDetails: any;
  packages: any;
  type: any = window.localStorage.getItem('token');

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.getVendorDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllPackagesPage');
  }

  getVendorDetails() {
    let payload = {
      "custom": "true",
      "action": "getVendor_Details",
      "token": window.localStorage.getItem('token'),
      "data": { "vendor": this.cat_details_id }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userProvider.getVendorDetails(payload).subscribe((res: any) => {
      this.vendorDetails = res.data[0];
      res.data[0].packages.forEach(e => {
        e.pack_image = `http://elfarahapp.com${e.pack_image}`;
      })
      this.packages = res.data[0].packages;
      console.log(this.packages);
      console.log(this.vendorDetails);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  requestPackage(selected_package) {
    if (this.type == 'guest') this.navCtrl.setRoot('IntroPage');
    else {
      window.localStorage.setItem('pacakge', JSON.stringify(selected_package));
      this.navCtrl.push('RequestPackagePage');
    }
  }

}
