import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient, public URL: ConfigService) { }

  PanelSignIn(user: any): Observable<any> {
    return this.http.post<any>(this.URL.baseURL + '/user/login', user, httpOptions).pipe(map((res) => { return res })
    );
  }
  addPanelUser(user: any): Observable<any> {
    return this.http.post<any>(this.URL.baseURL + '/user/signup', user, httpOptions).pipe(map((res) => { return res })
    );
  }
}
