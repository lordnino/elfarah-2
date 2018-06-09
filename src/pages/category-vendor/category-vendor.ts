import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CategoryVendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-vendor',
  templateUrl: 'category-vendor.html',
})
export class CategoryVendorPage {

  cat_details_id: any = window.localStorage.getItem('cat_id');
  cat_details: any;
  rate: any;
  followers: any;
  vendorDetails: any;
  vendor_images: any;
  packages: any;
  type: any = window.localStorage.getItem('type');

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController, private helperLib: IonicLibraryService) {
  }

  ngOnInit() {
    this.getCatDetails();
    this.getVendorDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryVendorPage');
  }

  getCatDetails() {
    let payload = {
      "custom": "true",
      "action": "getCategory_Vendors",
      "data": { "category_id": this.cat_details_id }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userProvider.getCategoriesDetails(payload).subscribe((res: any) => {
      res.data.forEach(e => {
        e.web_path = `http://elfarahapp.com${e.web_path}`;
      });
      this.cat_details = res.data;
      console.log(this.cat_details);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  getUserFollowers() {
    let payload = {
      "custom": "true",
      "action": "User_Follows",
      "token": window.localStorage.getItem('token'),
      "data": ""
    }
    this.userProvider.getUserFollowers(payload).subscribe((res: any) => {
      this.followers = res.data;
    }, err => console.log(err));
  }

  getVendorDetails() {
    let payload = {
      "custom": "true",
      "action": "getVendor_Details",
      "token": window.localStorage.getItem('token'),
      "data": { "vendor": this.cat_details_id }
    }
    this.userProvider.getVendorDetails(payload).subscribe((res: any) => {
      this.vendorDetails = res.data[0];
      res.data[0].packages.forEach(e => {
        e.pack_image = `http://elfarahapp.com${e.pack_image}`;
      })
      this.packages = res.data[0].packages;
      console.log(this.packages);
      console.log(this.vendorDetails);
      res.data[0].vendor_images.forEach(e => {
        e.web_path = `http://elfarahapp.com${e.web_path}`;
      });
      this.vendor_images = res.data[0].vendor_images;
    }, err => console.log(err));
  }

  followVendor() {
    if (this.type == 'guest') this.navCtrl.setRoot('IntroPage');
    else {
      this.vendorDetails.vendor[0].user_follow = 1;
      this.vendorDetails.vendor[0].vendor_followers++;
      let payload = {
        "custom": "true",
        "action": "Vendor_Follow",
        "token": window.localStorage.getItem('token'),
        "data": { "vendor_id": this.cat_details_id }
      }
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.userProvider.followOrUnfollowVendor(payload).subscribe((res: any) => {
      }, err => console.log(err)
      , () => loading.dismiss());
    }
  }

  unFollowVendor() {
    if (this.type == 'guest') this.navCtrl.setRoot('IntroPage');
    else {
      this.vendorDetails.vendor[0].user_follow = 0;
      this.vendorDetails.vendor[0].vendor_followers--;
      let payload = {
        "custom": "true",
        "action": "Vendor_UnFollow",
        "token": window.localStorage.getItem('token'),
        "data": { "vendor_id": this.cat_details_id }
      }
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.userProvider.followOrUnfollowVendor(payload).subscribe((res: any) => {
      }, err => console.log(err)
      , () => loading.dismiss());
    }
  }

  goToAllPackages() {
    window.localStorage.setItem('vendor_details', JSON.stringify(this.vendorDetails));
    this.navCtrl.push('AllPackagesPage');
  }

  requestPackage(selected_package) {
    if (this.type == 'guest') this.navCtrl.setRoot('IntroPage');
    else {
      window.localStorage.setItem('vendor_details', JSON.stringify(this.vendorDetails));
      window.localStorage.setItem('pacakge', JSON.stringify(selected_package));
      this.navCtrl.push('RequestPackagePage');
    }
  }

  onModelChange(ev){
    console.log(ev);
    let rate = this.vendorDetails.vendor[0].vendor_rate;
    let payload = {
      "custom":"true",
      "action":"Add_Vendor_Review",
      "token": window.localStorage.getItem('token'),
      "data":{"vendor_id": this.cat_details_id,"rate": rate}
    }
    this.userProvider.rateUser(payload).subscribe((res: any) => {
      this.helperLib.basictoast('Added rating successfully.', 2000, 'bottom');
    }, err => console.log(err));
  }
}
