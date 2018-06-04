import { VendorsProvider } from './../../providers/vendors/vendors';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the PackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html',
})
export class PackagesPage {

  userProfile: any = JSON.parse(window.localStorage.getItem('userProfile'));
  packages: any;
  vendorData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private helperLib: IonicLibraryService, private vendorsProvider: VendorsProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagesPage');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPackages();
  }

  getPackages() {
    let payload = {
      "custom": "true",
      "action": "getVendor_Packages",
      "data": { "vendor": this.userProfile.id }
    }
    this.vendorsProvider.getVendorsPackages(payload).subscribe((res: any) => {
      // console.log(data);
      console.log(res.data[0].packages);
      res.data[0].packages.forEach(e => {
        let bullets = [];
        bullets.push(e.pack_desc.split(/\r?\n/));
        e.bullets = bullets;
        e.pack_image = `http://elfarahapp.com${e.pack_image}`
      });
      this.packages = res.data[0].packages;
      this.vendorData = res.data[0].vendor[0];
      console.log(this.packages);
    }, err => console.log(err));
  }

  goToCreatePackage() {
    let data = {
      is_edit: false,
      vendor: this.vendorData
    }
    this.navCtrl.push('AddEditPackagePage', { data: data });
  }

  goToEditPackage(packageDetails){
    console.log(this.vendorData);
    let data = {
      is_edit: true,
      package: packageDetails,
      vendor: this.vendorData
    }
    this.navCtrl.push('AddEditPackagePage', {data: data});
  }

  deletePackage(index) {
    let payload = {
      "custom": "true"
      , "action": "delete_package"
      , "token": window.localStorage.getItem('token')
      , "data": { "pack_id": this.packages[index].id }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendorsProvider.deletePackage(payload).subscribe((res: any) => {
      this.getPackages();
    }, err => console.log(err)
    , () => loading.dismiss());
  }

}
