import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/Auth/registration.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../service/Auth/auth-guard.service';
import Swal from 'sweetalert2';
import { CryptoService } from '../service/Encryption/crypto.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  loginisopen: boolean = true;
  userObject = {
    "username": "",
    "password": ""
  }
  naam: any;
  constructor(public enc: CryptoService, public authReg: RegistrationService, public router: Router, public authservice: AuthGuardService) {
    this.loginisopen;

  }
  showmissing() {
    Swal.fire({
      title: 'Ooops!',
      text: 'Something is missing',
      icon: 'warning',
      // confirmButtonText: 'yes ',
      // cancelButtonText:'No',
      // showCancelButton:true
    })
  }
  noalert() {
    Swal.fire({
      title: 'Error!',
      text: 'User Not Exist',
      icon: 'error',
    })
  }
  successalert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }

  ngOnInit() {

  }

  opensignUp() {
    this.loginisopen = false;
  }

  opensignIn() {
    this.loginisopen = true;
  }
  loginFunction() {

    // console.log('object', this.userObject);
    this.authReg.PanelSignIn(this.userObject).subscribe((res) => {
      // console.log(res)
      if (res.status == '0') {
        // alert('error')
        this.showmissing();
        // swal("Oopss", res.message, "error");
        // this.loginfailToast(res.message);
      } else if (res.userExist.active == false) {
        this.noalert();
        // swal("Oopss", res.message, "error");
        //alert('failed')

        // } else if (res.userExist.isFirstlogin == false) {

        //   this.signinNav();
        //   this.presentToast();
        //   this.userObject.username = '';
        //   this.userObject.password = '';
        //   localStorage.setItem('accesstoken', res.token.access_token);
        //   localStorage.setItem('Refreshtoken', res.token.refresh_token);
        //   localStorage.setItem('tokenExpiry', res.token.expires_in);
        //   localStorage.setItem('UserID', res.userExist.id);
        //   localStorage.setItem('Username', res.userExist.fullName);
        //   localStorage.setItem('temp', res.userExist.settings.temp);
        //   localStorage.setItem('email', res.userExist.email);
        //   localStorage.setItem('phone',res.userExist.number)
        //   localStorage.setItem('FL',res.userExist.isFirstlogin)




      }
      else {
        this.router.navigate(['/dashboard']);
        this.successalert();
        // this.login = true;
        // swal("Successful",res.message, "success");
        this.userObject.username = '';
        this.userObject.password = '';

        //  ('aaaa','dsadasd',true)
        this.enc.setItem('accesstoken', res.token.access_token, true);
        this.enc.setItem('Username', res.userExist.fullName, true);
        this.naam = this.enc.getItem('Username', true);

        this.authservice.isLoggedIn = true;
        return this.enc.setItem('logvalue', JSON.stringify(this.authservice.isLoggedIn), true);

        // this.events.publish('setimagename');
        // localStorage.setItem('Refreshtoken', res.token.refresh_token);
        // localStorage.setItem('tokenExpiry', res.token.expires_in);
        // localStorage.setItem('UserID', res.userExist.id);
        // localStorage.setItem('Username', res.userExist.fullName);
        // localStorage.setItem('temp', res.userExist.settings.temp);
        // localStorage.setItem('email', res.userExist.email);
        // localStorage.setItem('phone',res.userExist.number);
        // localStorage.setItem('FL',res.userExist.isFirstlogin)
        // this.getClothdetails();

      }
    });
  }
}
