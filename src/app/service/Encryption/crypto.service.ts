import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// import * as AES from 'crypto-js/aes';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }
  encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret123456145674125896', { iv: "secret1234561456" }).toString();
  }
  decrypt(data) {
    if (data !== null || data !== 'undefined') {
      var bytes  = CryptoJS.AES.decrypt(data.toString(), 'secret123456145674125896', { iv: "secret1234561456" });
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
    return data;
  }

  setItem(key, value, json = true) {
    var ciphertext
    if (json === true)
      ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), 'secret123456145674125896', { iv: "secret1234561456" });
    else {
      if (typeof value === 'number') value = value.toString();
      ciphertext = CryptoJS.AES.encrypt(value, 'secret123456145674125896',{ iv: "secret1234561456" });
    }
    localStorage.setItem(key, ciphertext);

// this.decrypt(value)
    // if (json === true)
    //   value = JSON.stringify(value);
    // localStorage.setItem(key, value);
  }

  getItem(key, json = true) {
    if (localStorage.getItem(key) !== null) {
      var bytes  = CryptoJS.AES.decrypt(localStorage.getItem(key).toString(), 'secret123456145674125896', { iv: "secret1234561456" });
   
      if (json === true){
        

        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      }
      
      else
        return bytes.toString(CryptoJS.enc.Utf8)
    }
    return localStorage.getItem(key);

    // if (json === true)
    //   return JSON.parse(localStorage.getItem(key));
    // return localStorage.getItem(key);
  }

}

