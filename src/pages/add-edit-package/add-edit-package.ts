import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { VendorsProvider } from './../../providers/vendors/vendors';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the AddEditPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit-package',
  templateUrl: 'add-edit-package.html',
})
export class AddEditPackagePage {

  is_edit: boolean;
  imageFileName: any;
  imageURI: any;
  imageId: any;
  packageData: any = {
    name: '',
    price: '',
    desc: ''
  };
  vendor: any;
  package: any;
  imageUploaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public vendorsProvider: VendorsProvider,
    public helperLibrary: IonicLibraryService,
    private base64: Base64) {
    // console.log(this.navParams.get('data'));
    this.is_edit = this.navParams.get('data').is_edit;
    this.vendor = this.navParams.get('data').vendor;
    this.package = this.navParams.get('data').package;
    console.log(this.navParams.get('data'));
    console.log(this.is_edit);
    console.log(this.vendor);
    console.log(this.package);
    if (this.is_edit) {
      this.packageData.name = this.package.pack_name;
      this.packageData.price = this.package.pack_price;
      this.packageData.desc = this.package.pack_desc;
      this.imageId = this.package.pack_image_id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditPackagePage');
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: 0,
      destinationType: this.camera.DestinationType.FILE_URI
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageUploaded = true;
      this.imageFileName = imageData;
      let imageBase64: any;
      this.base64.encodeFile(imageData).then((base64File: string) => {
        imageBase64 = base64File;
      })
      this.vendorsProvider.uploadPackageImage(imageBase64).subscribe((res: any) => {
        if (res.status.code == 200) {
          this.imageId = res.data.id;
        } else {
          this.helperLibrary.basictoast('Please try again later', 2000, 'bottom');
        }
      }, err => console.log(err));
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    if (this.is_edit) {
      let payload = {
        "custom": "true",
        "action": "Vendor_Edit_Package",
        "token": window.localStorage.getItem('token'),
        "data": {
          "package_id": this.package.id,
          "deal_price": this.packageData.price,
          "vendor_id": this.vendor.id,
          "description": this.packageData.desc,
          "deal_name": this.packageData.name,
          "image": this.imageId
        }
      }
      console.log(payload);
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.vendorsProvider.editPackage(payload).subscribe((res: any) => {
        this.navCtrl.pop();
      }, err => console.log(err)
        , () => loading.dismiss);
    } else {
      if (!this.imageId) this.helperLibrary.basictoast('You have to upload an image', 2000, 'bottom');
      else {
        let payload = {
          "custom": "true", "action": "Vendor_Create_Package", "token": window.localStorage.getItem('token'),
          "data": { "deal_name": this.packageData.name, "deal_price": this.packageData.price, "description": this.packageData.desc, "image": this.imageId }
        }
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.vendorsProvider.createPackage(payload).subscribe((res: any) => {
          this.navCtrl.pop();
        }, err => console.log(err)
          , () => loading.dismiss());
      }
    }
  }

}
