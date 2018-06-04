import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { VendorsProvider } from './../../providers/vendors/vendors';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  tabs: any = 'pending';
  doneDeals: any = [];
  pendingDeals: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vendorsProviders: VendorsProvider, private helperLib: IonicLibraryService, private callNumber: CallNumber, private sms: SMS, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.getOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  getOrders() {
    let payload = {
      "custom": "true",
      "action": "Vendor_Orders",
      "token": window.localStorage.getItem('token')
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendorsProviders.getVendorsOrders(payload).subscribe((res: any) => {
      res.data.forEach(e => {
        e.open = false;
        if (e.state_name == 'Done Deal') {
          if (this.doneDeals.length == 0) this.doneDeals = [e];
          else this.doneDeals.push(e);
        } else {
          if (this.pendingDeals.length == 0) this.pendingDeals = [e];
          else this.pendingDeals.push(e);
        }
      });
      console.log(this.pendingDeals);
      console.log(this.doneDeals);
    }, err => console.log(err)
    , () => loading.dismiss());
  }

  open(index) {
    // console.log();
    this.pendingDeals[index].open = !this.pendingDeals[index].open;
  }

  openDoneDeal(index) {
    this.doneDeals[index].open = !this.doneDeals[index].open;
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

  leaveNote(order) {
    let alert = this.alertCtrl.create({
      title: 'Leave Note',
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
              "action": "Vendor_Update_Order"
              , "token": window.localStorage.getItem('token')
              , "data":
                {
                  "id": order.id,
                  "date_from": order.date_from,
                  "date_to": order.date_to,
                  "deal_price": order.deal_price,
                  "description": data.Note
                }
            }
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loading.present();
            this.vendorsProviders.updateVendorOrder(payload).subscribe((res: any) => {
              if (res.status.message == 'Done') {
                this.helperLib.basictoast('Note sent successfully', 2000, 'bottom');
                this.getOrders();
              }
            }, err => console.log(err)
            , () => loading.dismiss());
          }
        }
      ]
    });
    alert.present();
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

  acceptOrder(data) {
    console.log(data);
    let payload = {
      "custom": "true",
      "action": "Vendor_Update_Order"
      , "token": window.localStorage.getItem('token')
      , "data":
        {
          "id": data.id,
          "date_from": data.date_from,
          "date_to": data.date_to,
          "deal_price": data.deal_price,
          "description": data.description
        }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendorsProviders.updateVendorOrder(payload).subscribe((res: any) => {
      if (res.status.message == 'Done') {
        this.helperLib.basictoast('Done', 2000, 'bottom');
        this.getOrders();
      }
    }, err => console.log(err)
    , () => loading.dismiss());
  }


}
