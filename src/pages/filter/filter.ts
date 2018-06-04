import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendorsProvider } from './../../providers/vendors/vendors';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  countries: any;
  cities: any;
  form: FormGroup;
  dualValue2: any;
  singleValue: number = 5;
  priceRange: any = {

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public vendoresProvider: VendorsProvider, public fb: FormBuilder, private helperLib: IonicLibraryService, private viewCtrl: ViewController, private loadingCtrl: LoadingController) {
    this.createForm();
  }

  ngOnInit() {
    this.getCountries();
  }

  ionViewWillEnter(){
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  getCountries() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendoresProvider.getCountries().subscribe((res: any) => {
      console.log(res);
      this.countries = [{
        name: res.data[0].Name,
        id: res.data[0].ID
      }];
      this.cities = res.data[0].cities;
      this.form.get('country').patchValue(this.countries[0].id);
      this.form.get('city').patchValue(this.cities[0].id);
      // console.log(this.form.value);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  createForm() {
    this.form = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      price_range: [{
        lower: 0,
        upper: 20000
      }, Validators.required],
      rating: ['', Validators.required]
    })
  }

  cancel() {
    this.navCtrl.pop();
  }

  reset() {
    this.createForm();
  }

  filter() {
    if (this.form.invalid) {
      this.helperLib.basictoast('All inputs are required', 2000, 'bottom');
    } else {
      console.log(this.form.value);
      // this.navCtrl.pop(this.form.value);
      this.viewCtrl.dismiss(this.form.value);
    }
  }

}
