import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private menuController: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  ionViewDidEnter(){
    this.menuController.enable(false);
  }

  goToLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  goToSignUp() {
    this.navCtrl.setRoot('SignUpPage');
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
