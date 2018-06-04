import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { VendorsProvider } from './../../providers/vendors/vendors';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  sendCodeMode: boolean = false;
  email: any;
  code: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuController: MenuController, private vendorsProvider: VendorsProvider, private helperLib: IonicLibraryService, private loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.menuController.enable(false);
  }

  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendCode() {
    if (this.sendCodeMode) {
      if (!this.code || !this.password) this.helperLib.basictoast('Code and your new password are required', 3000, 'bottom')
      else {
        let payload = {
          "custom": "true",
          "action": "Send_Verif_Code",
          "data": {
            "code": this.code,
            "newPass": this.password,
            "ref": "USER_41"
          }
        }
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.vendorsProvider.forgotPasswordChangePassword(payload).subscribe((res: any) => {
          if (res.status.code == 200) {
            this.helperLib.basictoast('Your password has changed successfully', 5000, 'bottom');
            this.navCtrl.setRoot('LoginPage');
          } else {
            this.helperLib.basictoast('Wrong Code', 4000, 'bottom');
          }
        }, err => console.log(err)
        , () => loading.dismiss());
      }
    } else {
      if (!this.email) this.helperLib.basictoast('Email is required', 2000, 'bottom');
      else {
        let payload = {
          "custom": "true",
          "action": "Forget_Pass",
          "data": {
            "email": this.email,
            "type": "Vendor"
          }
        }
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.vendorsProvider.forgotPasswordSendCode(payload).subscribe((res: any) => {
          console.log(res);
          if (res.status.code == 200) {
            this.helperLib.basictoast('Complete the step by enter the code sent to your email and your new password', 6000, 'bottom');
            this.sendCodeMode = true;
          } else {
            this.helperLib.basictoast('Invalid email', 4000, 'bottom');
          }
        }, err => console.log(err)
        , () => loading.dismiss());
      }
    }
  }

}
