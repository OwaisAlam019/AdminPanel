import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ConfigService } from '../config.service';
import { CryptoService } from '../Encryption/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class DatacountsService {

  token;
  constructor(public http: HttpClient, public URL: ConfigService,public enc :CryptoService) { }
  getUser_Counts(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/reports/count/users', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  getArticle_Counts(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/reports/count/articles', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  getCombinations_Counts(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/reports/count/combinations', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  getPattrens_Counts(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/reports/count/combination/pattrens', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  getOutfits_Counts(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/reports/count/outfits', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
  getRecommendation_Counts(): Observable<any> {
    this.token = this.enc.getItem('accesstoken',true);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    };
    return this.http.get(this.URL.baseURL + '/reports/recommendations', httpOptions).pipe(
      map((res) => { return res }

      ));
  }
}
