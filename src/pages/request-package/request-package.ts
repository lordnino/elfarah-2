import { UserProvider } from './../../providers/user/user';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RequestPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-package',
  templateUrl: 'request-package.html',
})
export class RequestPackagePage {

  requestForm: FormGroup;
  package: any = JSON.parse(window.localStorage.getItem('pacakge'));
  vendor_details: any = JSON.parse(window.localStorage.getItem('vendor_details'));

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public helperLib: IonicLibraryService, private userProvider: UserProvider, private loadingCtrl: LoadingController) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.package);
    console.log(this.vendor_details);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPackagePage');
  }

  createForm() {
    console.log(new Date());
    this.requestForm = this.fb.group({
      from: [new Date().toISOString(), Validators.required],
      to: [new Date().toISOString(), Validators.required],
      notes: ['']
    })
  }

  cancel() {
    this.navCtrl.setRoot('CategoryVendorPage');
  }

  send() {
    let form = this.requestForm.value;
    console.log(this.requestForm.value);
    if (!this.requestForm.valid) this.helperLib.basictoast('Please select a time', 2000, 'bottom');
    else {
      let payload = {
        "custom": "true",
        "action": "Request_Package",
        "token": "USER_292051688-36a1-11e8-8620-b4969109f4f8",
        "data": {
          "package_id": this.package.id,
          "from_date_time": `${form.from.substr(0, 10)} ${form.from.substr(11,18)}`,
          "to_date_time": `${form.to.substr(0, 10)} ${form.to.substr(11,18)}`,
          "deal_price": this.package.pack_price,
          "order_deal_state": "1",
          "vendor_id": this.vendor_details.vendor[0].id,
          "description": this.package.pack_desc,
          "Notes": form.notes
        }
      }
      console.log(payload);
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.userProvider.requestPackage(payload).subscribe((res: any) => {
        if(res.Message == 'Success') {
          this.helperLib.basictoast('Sent the request successfully', 2000, 'bottom');
          this.navCtrl.setRoot('CategoryVendorPage');
        } else this.helperLib.basictoast('Please try again later', 2000, 'bottom');
      }, err => console.log(err)
      , () => loading.dismiss());
    }
  }
}
