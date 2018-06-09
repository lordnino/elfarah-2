import { UserProvider } from './../../providers/user/user';
import { IonicLibraryService } from './../../providers/ionic-lib.service';
import { VendorsProvider } from './../../providers/vendors/vendors';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userProfile: any = JSON.parse(window.localStorage.getItem('userProfile'));
  tabs: any = 'profile';
  profile: any;
  passwordData: any = {
    current: '',
    new: '',
    re_new: ''
  }
  vendorImages: any = [];
  imageUploaded: boolean = false;
  imageFileName: any;
  imageURI: any;
  imageId: any;
  type: any = window.localStorage.getItem('type');
  userImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vendorsProvider: VendorsProvider, private helperLib: IonicLibraryService, private authProvider: AuthProvider, private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    private base64: Base64) {
    if (this.type == 'user') {
      this.userImage = this.userProfile.profile_image;
      console.log(this.userImage);
      if (this.userImage == null) {
        this.userImage = 'https://www.worldcrunch.com/assets/img/avatars/thumbnails/default-user-img-profile.jpg';
      } else {
        this.userImage = `http://elfarahapp.com${this.userProfile.profile_image}`;
      }
      this.profile = {
        first: this.userProfile.name.split(' ')[0],
        last: this.userProfile.name.split(' ').slice(1).join(' '),
        phone: this.userProfile.user_phone,
        email: this.userProfile.email
      }
    } else {
      this.profile = {
        first: this.userProfile.name.split(' ')[0],
        last: this.userProfile.name.split(' ')[1],
        phone: this.userProfile.user_phone,
        desc: this.userProfile.vendor_description,
        email: this.userProfile.email
      }
    }
  }

  ngOnInit() {
    this.getVendorImages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getVendorImages() {
    let payload = {
      "custom": "true",
      "action": "GetVendorImages",
      "token": window.localStorage.getItem('token')
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.vendorsProvider.getVendorImages(payload).subscribe((res: any) => {
      res.data.forEach(e => {
        e.web_path = 'http://elfarahapp.com' + e.web_path
      })
      this.vendorImages = res.data;
      console.log(this.vendorImages);
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  updateUserData() {
    if (!this.profile.email) this.helperLib.basictoast('Email field is required', 2000, 'bottom');
    else {
      let payload = {
        "custom": "true",
        "action": "Update_Profile"
        , "token": window.localStorage.getItem('token')
        , "data":
          {
            "name": this.profile.first + ' ' + this.profile.last
            , "user_phone": this.profile.phone
            , "vendor_description": this.profile.desc
          }
      }
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.vendorsProvider.editVendor(payload).subscribe((res: any) => {
        if (res.status.code == 200) this.helperLib.basictoast('Updated data successfully', 2000, 'bottom');
      }, err => this.helperLib.basictoast('Please try again later', 2000, 'bottom')
        , () => loading.dismiss());
    }
  }

  getUserData() {
    const getUserDataPayload = {
      "custom": "true",
      "action": "User_Data",
      "token": window.localStorage.getItem('token')
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authProvider.getUserData(getUserDataPayload).subscribe((userData: any) => {
      console.log(userData);
      window.localStorage.setItem('userProfile', JSON.stringify(userData.data[0]));
    }, err => console.log(err)
      , () => loading.dismiss());
  }

  updatePassword() {
    if (this.passwordData.new != this.passwordData.re_new) this.helperLib.basictoast('Password do not match', 2000, 'bottom');
    else {
      let payload = {
        "custom": "true",
        "action": "Update_Password"
        , "token": window.localStorage.getItem('token')
        , "data":
          {
            "currentPassword": this.passwordData.current
            , "newPassword": this.passwordData.new
          }
      }
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.vendorsProvider.changeVendorPassword(payload).subscribe((res: any) => {
        if (res.status.code == 200) this.helperLib.basictoast('Password changes successfullt', 2000, 'bottom');
      }, err => this.helperLib.basictoast('Please try again later', 2000, 'bottom')
        , () => loading.dismiss());
    }
  }

  getImage() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: CameraOptions = {
      quality: 100,
      sourceType: 0,
      destinationType: this.camera.DestinationType.FILE_URI,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageUploaded = true;
      this.imageFileName = imageData;
      // let imageBase64;
      // this.base64.encodeFile(imageData).then((base64File: string) => {
      //   imageBase64 = base64File;
      // })
      let fileOptions: FileUploadOptions = {
        fileKey: 'upload[]',
        httpMethod: 'post',
        headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' },
        params: {
          'custom': 'true',
          'action': 'upload_vendor_images',
          'token': window.localStorage.getItem('token'),
        }
      }
      fileTransfer.upload(imageData, 'http://elfarahapp-com.stackstaging.com/Application/rest/get.php', fileOptions)
        .then((res: any) => {
          console.log('uploaded image successfully!!!');
          console.log(res);
          res.forEach(e => {
            e.web_path = 'http://elfarahapp.com' + e.web_path
          })
          this.vendorImages = res;
          this.getVendorImages();
        }, (err) => {
          console.log(err);
        })
      // let loading = this.loadingCtrl.create({
      //   content: 'Please wait...'
      // });
      // loading.present();
      // this.vendorsProvider.uplaodVendorImage(imageBase64).subscribe((res: any) => {
      //   res.forEach(e => {
      //     e.web_path = 'http://elfarahapp.com' + e.web_path
      //   })
      //   this.vendorImages = res;
      //   this.getVendorImages();
      // }, err => console.log(err)
      //   , () => loading.dismiss());
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

  handleImage(image) {
    console.log(image);
    let alert = this.alertCtrl.create({
      title: 'Delete or Add Images',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            let payload = {
              "custom": "true",
              "action": "delete_vendor_image",
              "token": window.localStorage.getItem('token'),
              "data": { "image_id": image.id }
            }
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loading.present();
            this.vendorsProvider.deleteVendorImage(payload).subscribe((res: any) => {
              this.helperLib.basictoast('Image deleted successfully', 2000, 'bottom');
            }, err => console.log(err)
              , () => loading.dismiss());
          }
        },
        {
          text: 'Add',
          handler: () => {
            this.getImage();
          }
        }
      ]
    });
    alert.present();
  }

  uploadUserPic() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: CameraOptions = {
      quality: 100,
      sourceType: 0,
      destinationType: this.camera.DestinationType.FILE_URI,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let fileOptions: FileUploadOptions = {
      fileKey: 'base64File',
      httpMethod: 'post',
      chunkedMode: false,
      headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' },
      params: {
        'custom': 'true',
        'action': 'upload_package_image',
        'token': window.localStorage.getItem('token'),
      }
    }
    this.camera.getPicture(options).then((imageData) => {
      let imageBase64;
      this.imageFileName = imageData;
      this.userImage = imageData;
      fileTransfer.upload(imageData, 'http://elfarahapp-com.stackstaging.com/Application/rest/get.php', fileOptions)
        .then((res: any) => {
          console.log('uploaded image successfully!!!');
          console.log(res);
        }, (err) => {
          console.log(err);
        })
      // let payload: any;
      // this.base64.encodeFile(imageData).then((base64File: string) => {
      //   imageBase64 = base64File;
      //   payload = {
      //     "custom": "true",
      //     "token": window.localStorage.getItem('token'),
      //     "action": "upload_package_image",
      //     "upload": base64File
      //   }
      // })
      // this.userProvider.uploadProfilePic(payload).subscribe((res: any) => {
      //   this.userImage = `http://elfarahapp.com${res.data[0].web_path}`;
      //   this.getUserData();
      // }, err => console.log(err)
      //   , () => loading.dismiss());
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

}
