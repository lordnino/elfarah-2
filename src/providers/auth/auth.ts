import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  signUp(data){
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/create.php?ID=77', JSON.stringify(data));
  }

  login(data){
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php', JSON.stringify(data), {headers: this.headers});
  }

  getUserData(data){
    return this.http.post('http://elfarahapp-com.stackstaging.com/Application/rest/get.php?ID=77', JSON.stringify(data), {headers: this.headers});
  }

}
