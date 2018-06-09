import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the CategoriesDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories-details',
  templateUrl: 'categories-details.html',
})
export class CategoriesDetailsPage {

  cat_details_id: any = window.localStorage.getItem('cat_id');
  cat_details: any;
  rate: any;
  searchText: any = '';
  raw_vendors: any;
  showSearch: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private modalCtrl: ModalController, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.getCatDetails();
  }

  ionViewWillEnter() {
    console.log('entered the view');
    this.getCatDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesDetailsPage');
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
      this.raw_vendors = res.data;
      this.cat_details = res.data;
      console.log(this.cat_details);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  goToCategoryVendor() {
    this.navCtrl.push('CategoryVendorPage');
  }

  goToFilterPage() {
    console.log('1');
    let modal = this.modalCtrl.create('FilterPage');
    modal.present();
    let filteredArr: any = [];
    modal.onDidDismiss(data => {
      console.log(data);
      if(data){
        this.cat_details.forEach(e => {
          if (data.country == e.country && data.rating == Number(e.vendor_rate) && data.price_range.lower <= Number(e.to_price) && data.price_range.upper >= Number(e.to_price)) {
            filteredArr.push(e);
          }
        });
        console.log(filteredArr);
        this.cat_details = filteredArr;
        console.log(this.cat_details);
      }
    })
    // this.navCtrl.push('FilterPage');
  }

  toggleSearch(){
    this.showSearch = !this.showSearch;
  }

  onInput(ev){
    let filteredArr: any = [];
    if(this.searchText == ''){
      this.cat_details = this.raw_vendors;
    } else {
      this.raw_vendors.forEach(element => {
        if(element.vendor_name.toLowerCase().includes(this.searchText.toLowerCase())) filteredArr.push(element);
      });
      console.log(filteredArr);
      this.cat_details = filteredArr;
    }
  }

  onCancel(ev){
    this.cat_details = this.raw_vendors;
  }
}
