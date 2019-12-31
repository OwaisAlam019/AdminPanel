import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { CryptoService } from '../Encryption/crypto.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    isLoggedIn: boolean ;
    constructor(private router: Router,public enc : CryptoService){ }
    // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
     
      if (this.enc.getItem('logvalue',true)==null) {
        
        return this.router.navigate(['/welcome']);
    }
    
    return true;

    
   
    //    if (localStorage.getItem('logvalue')) {
    //         console.log('true')
    //    return true;
    //  } else {
    //      console.log('false')
    //  this.router.navigate(['/welcome']);
    //      return false;
    //     }
      }
    
}