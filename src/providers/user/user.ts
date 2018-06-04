import { LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  loading: any;

  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello UserProvider Provider');
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


  getSliders(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  uploadProfilePic(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data) , { headers: this.headers });
  }

  getAllCategories(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php?ID=79', JSON.stringify(data), { headers: this.headers });
  }

  getCategoriesDetails(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  getUserFollowers(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  getVendorDetails(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers });
  }

  followOrUnfollowVendor(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers })
  }

  requestPackage(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), { headers: this.headers })
  }

  getUserOrders(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {
      headers: this.headers
    });
  }

  editOrder(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {
      headers: this.headers
    });
  }

  acceptOrder(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {
      headers: this.headers
    });
  }

  deleteOrder(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {
      headers: this.headers
    });
  }

  createUser(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/create.php?ID=77', JSON.stringify(data), {
      headers: this.headers
    });
  }

  nudge(data) {
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {
      headers: this.headers
    })
  }
}
