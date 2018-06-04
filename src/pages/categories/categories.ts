import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  sliderImgs: any;
  categories: any;
  searchText: any = '';
  raw_categories: any;
  showSearch: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private helperLib: IonicLibraryService, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.getSliders();
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  getSliders() {
    let payload = {
      "custom": "true",
      "action": "get_Slider"
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userProvider.getSliders(payload).subscribe((res: any) => {
      res.data.forEach(e => {
        e.web_path = `http://elfarahapp.com${e.web_path}`;
      });
      this.sliderImgs = res.data;
      console.log(this.sliderImgs);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  getCategories() {
    let payload = {
      "custom": "true",
      "action": "get_Categories"
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userProvider.getAllCategories(payload).subscribe((res: any) => {
      res.data.forEach(e => {
        e.Images = `http://elfarahapp.com${e.Images}`;
      })
      this.raw_categories = res.data;
      this.categories = res.data;
      console.log(this.categories);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  goToCatDetails(cat){
    window.localStorage.setItem('cat_id', cat.id);
    this.navCtrl.push('CategoriesDetailsPage');
  }

  toggleSearch(){
    this.showSearch = !this.showSearch;
  }

  onInput(ev){
    let filteredArr: any = [];
    if(this.searchText == ''){
      this.categories = this.raw_categories;
    } else {
      this.raw_categories.forEach(element => {
        if(element.Name.toLowerCase().includes(this.searchText.toLowerCase())) filteredArr.push(element);
      });
      console.log(filteredArr);
      this.categories = filteredArr;
    }
  }

  onCancel(ev){
    this.categories = this.raw_categories;
  }

}
