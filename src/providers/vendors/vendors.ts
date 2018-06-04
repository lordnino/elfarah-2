import { LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the VendorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VendorsProvider {

  loading: any;
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });


  constructor(public http: HttpClient, private loadingCtrl: LoadingController) {
    console.log('Hello VendorsProvider Provider');
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  getStatistics(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  editVendor(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  getVendorImages(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php?ID=77', JSON.stringify(data), { headers: this.headers });
  }

  changeVendorPassword(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers })
  }

  getVendorsOrders(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers })
  }

  getVendorsPackages(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers })
  }

  uploadPackageImage(data) {
    let formData: FormData = new FormData();
    formData.append('custom', 'true');
    formData.append('action', 'upload_package_image');
    formData.append('token', window.localStorage.getItem('token'));
    formData.append('upload[]', data);
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', formData , { headers: headers });
  }

  deletePackage(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  createPackage(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  editPackage(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  getCountries() {
    let data = {
      "custom": "true",
      "action": "get_Country"
    }
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers })
  }

  getCategories() {
    let data = {
      "custom": "true",
      "action": "get_Categories"
    }
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php?ID=79', JSON.stringify(data), { headers: this.headers })
  }

  createVendor(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/create.php?ID=80', JSON.stringify(data), { headers: this.headers });
  }

  uplaodVendorImage(data) {
    let formData: FormData = new FormData();
    formData.append('custom', 'true');
    formData.append('action', 'upload_vendor_images');
    formData.append('token', window.localStorage.getItem('token'));
    formData.append('upload[]', data);
    let headers = new HttpHeaders({'Access-Control-Allow-Origin': '*' });
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', formData, { headers: headers });
  }

  acceptOrder(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  forgotPasswordSendCode(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  forgotPasswordChangePassword(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  updateVendorOrder(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  deleteVendorImage(data){
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {headers: this.headers});
  }
}
