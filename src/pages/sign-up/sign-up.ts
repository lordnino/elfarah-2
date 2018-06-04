import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private helperLib: IonicLibraryService, private menuController: MenuController, private events: Events) {
    this.createForm();
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  ionViewDidEnter() {
    this.menuController.enable(false);
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
      type: ['vendor', Validators.required]
    })
  }

  goBack() {
    this.navCtrl.setRoot('IntroPage');
  }

  signUp() {
    // this.navCtrl.push('SignUpSecondPage');
    console.log(this.form.value);
    if (this.form.invalid) this.helperLib.basictoast('Please fill all the above inputs', 2000, 'bottom');
    else if (this.form.get('password').value != this.form.get('re_password').value) this.helperLib.basictoast('Password does not match', 2000, 'bottom');
    else {
      this.navCtrl.push('SignUpSecondPage', {
        data: this.form.value
      })
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
