import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse

} from '@angular/common/http';
// import 'rxjs/add/operator/tap';
import { tap } from "rxjs/operators";
import { AuthGuardService } from '../Auth/auth-guard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CryptoService } from '../Encryption/crypto.service';
@Injectable({
  providedIn: 'root'
})
@Injectable()

export class InterceptorService implements HttpInterceptor {

  constructor(public enc: CryptoService,public authservice: AuthGuardService,public route : Router) { }
  showmissing() {
    Swal.fire({
      title: 'Session Expired!',
      text: 'Please Login Again to Continue',
      icon: 'warning',
      // confirmButtonText: 'yes ',
      // cancelButtonText:'No',
      // showCancelButton:true
    })
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.enc.getItem('accesstoken',true)) {
      // console.log('With---out------Authorization========>')
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': `application/json`,
        }
      });
    } else {
      // console.log('WithAuthorization========>');

      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': `application/json`,
          Authorization: `Bearer ${this.enc.getItem('accesstoken',true)}`
        }
      });
    }
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // console.log('event instance of httpres', event)
        this.enc.setItem('viewindex', '0',true);
        // localStorage.setItem('viewindex', '0');
      }
    }, (err: any) => {

      if (err instanceof HttpErrorResponse) {
        // console.log('err instance of errr', err)
        if ((err.status === 401 || err.status === 500) && this.enc.getItem('viewindex',true)) {
         this.showmissing();
          localStorage.clear();
          // let ve = this.authservice.isLoggedIn = false;
          // alert('login again to continue')
         this.route.navigate(['/welcome']);
          // localStorage.setItem('logvalue',JSON.stringify(ve));
         
          

        }
      }
    }));
  }
  
}
