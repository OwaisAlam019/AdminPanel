import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ConfigService } from '../config.service';
import { CryptoService } from '../Encryption/crypto.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  token;
  constructor(public http: HttpClient, public URL: ConfigService,public enc : CryptoService) { }
  getdetails(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    // console.log(this.token)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/cloth/getPanelData', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  postdeatil(user: any): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.post<any>(this.URL.baseURL + '/cloth/add', user, httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  // addsignin(user: any): Observable<any> {
  //   return this.http.post<any>(this.URL.baseURL+'/user/login',user,httpOptions).pipe(
  //       map((res)=>{return res}

  //       ));
  // }

}
