import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  type: any = 'vendor';

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public helperLib: IonicLibraryService, private authProvider: AuthProvider, private menuController: MenuController, public events: Events, private userProvider: UserProvider, private loadingCtrl: LoadingController) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter(){
    this.menuController.enable(false);
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  goBack() {
    this.navCtrl.setRoot('IntroPage');
  }

  goToForgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  login() {
    console.log(this.type);
    if (this.form.invalid) this.helperLib.basictoast('Email and Password are required', 2000, 'bottom');
    else {
      const payload =
        {
          "Login": {
            "email": this.form.get('email').value,
            "password": this.form.get('password').value,
            "type": this.type
          }
        };
      console.log(payload);
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.authProvider.login(payload).subscribe((res: any) => {
        console.log(res);
        if (res.status.code == 200) {
          window.localStorage.setItem('token', res.token);
          window.localStorage.setItem('type', this.type);
          const getUserDataPayload = {
            "custom":"true",
            "action":"User_Data",
            "token": res.token
           }
          this.authProvider.getUserData(getUserDataPayload).subscribe((userData: any) => {
            window.localStorage.setItem('userProfile', JSON.stringify(userData.data[0]));
            console.log(userData.data[0]);
            this.events.publish('user:login', this.type);
            this.menuController.enable(true);
            if (payload.Login.type == 'vendor'){
              this.navCtrl.setRoot('DashboardPage');
            } else {
              this.navCtrl.setRoot('CategoriesPage');
            }
          }, err => console.log(err));
        } else {
          this.helperLib.basictoast('Invalid Email or Password', 2000, 'bottom')
        }
      }, err => console.log(err)
      , () => loading.dismiss());
    }
  }


  loginAsAGuest(){
    let guest = {
      type: 'guest',
      name: 'Guest'
    }
    window.localStorage.setItem('userProfile', JSON.stringify(guest));
    window.localStorage.setItem('type', 'guest');
    this.events.publish('user:login', 'guest');
    this.menuController.enable(true);
    this.navCtrl.setRoot('CategoriesPage');
  }

}
