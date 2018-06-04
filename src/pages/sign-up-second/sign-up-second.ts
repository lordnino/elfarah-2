import { UserProvider } from './../../providers/user/user';
import { VendorsProvider } from './../../providers/vendors/vendors';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AuthProvider } from './../../providers/auth/auth';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the SignUpSecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-second',
  templateUrl: 'sign-up-second.html',
})
export class SignUpSecondPage {

  signUpFirstPageData: any;
  form: FormGroup;
  countries: any = [];
  cities: any;
  categories: any;
  type: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private helperLib: IonicLibraryService, private authProvider: AuthProvider, private menuController: MenuController, private vendoresProvider: VendorsProvider, private events: Events, private userProvider: UserProvider, private loadingCtrl: LoadingController) {
    this.signUpFirstPageData = this.navParams.get('data');
    this.type = this.signUpFirstPageData.type;
    console.log(this.signUpFirstPageData);
    if (this.type == 'vendor') {
      this.createForm();
    } else {
      this.createUserForm();
    }
  }

  createUserForm() {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getCountries();
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpSecondPage');
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
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  getCategories() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendoresProvider.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  ionViewDidEnter() {
    this.menuController.enable(false);
  }

  createForm() {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      category: ['', Validators.required],
      about: ['', Validators.required]
    })
  }

  goBack() {
    this.navCtrl.setRoot('SignUpPage');
  }

  signUp() {
    if (this.form.invalid) this.helperLib.basictoast('Please fill all the above inputs.', 2000, 'bottom');
    else {
      // do sign up
      const form = this.form.value;
      let payload;
      if (this.type == 'user') {
        payload = {
          "action": "create",
          "data":
            [
              {
                "users":
                  {
                    "name": `${form.first} ${form.last}`
                    , "email": this.signUpFirstPageData.email
                    , "password": this.signUpFirstPageData.password
                    , "approve": "1"
                    , "country": "1"
                    , "city": "1"
                    , "user_phone": form.phone
                    , "token": "1"
                    , "profile_image": "5"
                  }
              }
            ],
          "cond":
            {
              "users.token": ""
            }
        }
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.userProvider.createUser(payload).subscribe((res: any) => {
          window.localStorage.setItem('token', res.data[0].users.token);
          window.localStorage.setItem('type', this.signUpFirstPageData.type);
          const getUserDataPayload = {
            "custom": "true",
            "action": "User_Data",
            "token": res.data[0].users.token
          }
          this.authProvider.getUserData(getUserDataPayload).subscribe((userData: any) => {
            console.log(userData);
            console.log(userData.data[0]);
            window.localStorage.setItem('userProfile', JSON.stringify(userData.data[0]));
            this.menuController.enable(true);
            this.events.publish('user:login', this.signUpFirstPageData.type);
            this.navCtrl.setRoot('CategoriesPage');
          }, err => console.log(err));
        }, err => console.log(err)
        , () => loading.dismiss());
      } else {
        payload = {
          "action": "create",
          "data":
            [
              {
                "vendors":
                  {
                    "vendor_name": `${form.first} ${form.last}`
                    , "vendor_email": this.signUpFirstPageData.email
                    , "password": this.signUpFirstPageData.password
                    , "vendor_phone": form.phone
                    , "vendor_description": form.about
                    , "country": form.country
                    , "city": form.city
                    , "vendor_category": form.category
                  }
              }
            ],
          "cond":
            {
              "users.token": ""
            }
        }
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.vendoresProvider.createVendor(payload).subscribe((res: any) => {
          window.localStorage.setItem('token', res.data[0].vendors.token);
          window.localStorage.setItem('type', this.signUpFirstPageData.type);
          const getUserDataPayload = {
            "custom": "true",
            "action": "User_Data",
            "token": res.data[0].vendors.token
          }
          this.authProvider.getUserData(getUserDataPayload).subscribe((userData: any) => {
            console.log(userData);
            window.localStorage.setItem('userProfile', JSON.stringify(userData.data[0]));
            this.menuController.enable(true);
            this.events.publish('user:login', this.signUpFirstPageData.type);
            this.navCtrl.setRoot('DashboardPage');
          }, err => console.log(err));
        }, err => console.log(err)
        , () => loading.dismiss());
      }
    }
  }
}
