import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseURL:any="https://apis.dressmepro.com";
  // baseURL:any="http://192.168.18.103:8080"
  constructor() { }
}
