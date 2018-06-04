import { UserProvider } from './../../providers/user/user';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the MyPlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-plans',
  templateUrl: 'my-plans.html',
})
export class MyPlansPage {

  tabs: any = 'following';
  followers: any = [];
  done_deals: any = [];
  pending: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private helperLib: IonicLibraryService, private userService: UserProvider, private alertCtrl: AlertController, private callNumber: CallNumber, private sms: SMS, private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.getFollowers();
    this.getOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPlansPage');
  }

  getOrders() {
    let payload = {
      "custom": "true",
      "action": "User_Orders"
      , "token": window.localStorage.getItem('token')
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userService.getUserOrders(payload).subscribe((res: any) => {
      this.done_deals = [];
      this.pending = [];
      res.data.forEach(e => {
        e.open = false;
        if (e.state_name === 'Done Deal') {
          this.done_deals.push(e);
        } else {
          this.pending.push(e);
        }
      });
      console.log(this.pending);
      console.log(this.done_deals);
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  getFollowers() {
    let payload = {
      "custom": "true",
      "action": "User_Follows",
      "token": window.localStorage.getItem('token'),
      "data": ""
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userService.getUserFollowers(payload).subscribe((res: any) => {
      res.data.forEach(e => {
        e.Vendors.forEach(childElm => {
          childElm.Path = `http://elfarahapp.com${childElm.Path}`;
        })
      })
      this.followers = res.data;
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  goToVendorPage(vendor) {
    console.log(vendor);
    window.localStorage.setItem('cat_id', vendor.ID);
    this.navCtrl.push('CategoryVendorPage');
  }

  open(index) {
    // console.log();
    this.pending[index].open = !this.pending[index].open;
  }

  openDoneDeal(index) {
    this.done_deals[index].open = !this.done_deals[index].open;
  }

  leaveNote(order) {
    let alert = this.alertCtrl.create({
      title: 'Send Note',
      inputs: [
        {
          name: 'Note',
          placeholder: 'Note.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            let payload = {
              "custom": "true",
              "action": "Edit_Note"
              , "token": window.localStorage.getItem('token')
              , "data":
                {
                  "order_id": order.id,
                  "note": data.Note
                }
            }
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loading.present();
            this.userService.editOrder(payload).subscribe((res: any) => {
              this.helperLib.basictoast('Note sent successfully', 2000, 'bottom');
              this.getOrders();
            }, err => console.log(err)
              , () => loading.dismiss());
          }
        }
      ]
    });
    alert.present();
  }

  acceptOrder(order) {
    let payload = {
      "custom": "true",
      "action": "Done_Deal"
      , "token": window.localStorage.getItem('token'),
      "data": {
        "order_id": order.id
      }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userService.acceptOrder(payload).subscribe((res: any) => {
      this.getOrders();
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  deleteOrder(order) {
    console.log(order);
    let payload = {
      "custom": "true",
      "action": "Delete_Order",
      "token": "USER_292051688-36a1-11e8-8620-b4969109f4f8",
      "data": { "order_id": order.id }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userService.deleteOrder(payload).subscribe((res: any) => {
      this.helperLib.basictoast('ordered deleted successflly', 2000, 'bottom');
      this.getOrders();
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  call(number) {
    this.callNumber.callNumber(number, true)
      .then(res => {
        console.log('Launched dialer', res);
      })
      .catch(err => {
        console.log('Error Launching dialer', err);
      })
  }

  sendSms(number) {
    console.log('test');
    let alert = this.alertCtrl.create({
      title: 'Send SMS',
      inputs: [
        {
          name: 'Message',
          placeholder: 'Message.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (data) {
              // logged in!
              this.sms.send(number, data.Message)
                .then(res => {
                  console.log('sent the message', res);
                })
                .catch(err => {
                  console.log('error ', err);
                })
            }
          }
        }
      ]
    });
    alert.present();
  }

  sendANudge(id) {
    let payload = {
      "custom": "true",
      "action": "Nudge_Order",
      "token": "USER_292051688-36a1-11e8-8620-b4969109f4f8",
      "data": {
        "order_id": id
      }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userService.nudge(payload).subscribe((res) => {
      this.helperLib.basictoast('Sent a nudge successfully', 2000, 'bottom');
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  budgetCalc() {
    let budget: number = 0;
    console.log(this.done_deals);
    this.done_deals.forEach(e => {
      budget += +e.deal_price;
    })
    let alert = this.alertCtrl.create({
      title: 'Budget Calculator',
      message: `Your budget is ${budget} EGP`,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
