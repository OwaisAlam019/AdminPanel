import { Component, OnInit } from '@angular/core';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';
import { ClothesService } from '../service/clothing/clothes.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import Swal from 'sweetalert2';
import { CryptoService } from '../service/Encryption/crypto.service';
@Component({
  selector: 'app-clothingpanel',
  templateUrl: './clothingpanel.component.html',
  styleUrls: ['./clothingpanel.component.scss']
})
export class ClothingpanelComponent implements OnInit {
  public backgroundColor: string;
  public fontColor: string;
  public linkColor: string;
  selectedfile = null;
  public imagePath;
  imgURL: any;
  public message: string;
  encoded: any
  nameitem: any = '';
  clothtypes;
  colors: any = [];
  shades;
  patterns;
  login: boolean = false;
  patternspecial;
  append: any = "data:image/jpeg;base64,";
  ccc: any = "";
  clothObject = {
    "clothImage": this.append + "",
    "clothName": "",
    "color": "",
    "shade": "",
    "fitting": "",
    "pattern": "",
    "patternSpecial": "",
    "patternColor": "",
    "colorTag": "",
    "type": ""
  }
  // userObject = {
  //   "username": "",
  //   "password": ""
  // }
  naam: any;
  constructor(private spinnerService: Ng4LoadingSpinnerService,public clothpaneldetail: ClothesService,public enc : CryptoService) {
     this.naam=this.enc.getItem('Username',true);
  if (this.enc.getItem('accesstoken',true)) {
    this.login = true;
    this.naam=this.enc.getItem('Username',true);
  } else {
    this.login = false;
    this.naam=this.enc.getItem('Username',true);
  }
 }
 getClothdetails() {

  // this.navCtrl.push(QuestionsPage);
  this.clothpaneldetail.getdetails().subscribe((res) => {
    this.clothtypes = res.data.clothTypes;
    //  this.colors=res.data.colors;
    //  console.log('dasdasdasdadasdas',this.colors);
    this.shades = res.data.shades;
    this.patterns = res.data.patterns;
    this.patternspecial = res.data.patternSpecials;


  });

}
noalert() {
  Swal.fire({
    title: 'Error!',
    text: 'opps something is missiong',
    icon: 'error',
  })
}
successalert(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
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
    title: 'Cloth Uploaded Successfully'
  })
}

 ngOnInit() {
  this.backgroundColor = '#fff';
  this.fontColor = '#222';
  this.linkColor = '#fff';
  this.getClothdetails();
  
}

/**
 * Set color from color picker
 * @param {string} type
 * @param {string} color
 */
public setColor(type: string, color: string) {
  switch (type) {
    case 'background':
      this.backgroundColor = color;
      localStorage.removeItem('SC');
      break;
    case 'font':
      this.fontColor = color;
      break;
    case 'link':
      this.enc.setItem('SC','SC',true);
      this.linkColor = color;
      
      break;
    default:
      break;
  }

}

preview(files) {
  if (files.length === 0)
    return;
  this.nameitem = files[0].name.split(".")[0];

  console.log(this.nameitem)
  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
    this.imgURL = reader.result;
    this.encoded = this.imgURL.toString();
    // console.log(this.encoded);
  }
}

done() {
  this.spinnerService.show();
  this.clothObject.colorTag = this.enc.getItem('Ctag',true);
  // console.log(this.colors.hex);
  this.clothObject.color = this.enc.getItem('Cname',true);
  this.clothObject.clothImage = this.encoded;
  this.clothObject.clothName = this.nameitem
 this.clothObject.patternColor = this.linkColor;
   //console.log(this.clothObject);
  this.clothpaneldetail.postdeatil(this.clothObject).subscribe((res) => {
    console.log(res)
    if (res.status == 0) {
      // this.failed();
      this.noalert();
      this.spinnerService.hide();
    } else {
      // console.log(this.spinnerService.show())
      // this.spinnerService.show();
      // this.allgood();
      this.successalert();
      this.clothObject.clothImage = '';
      this.clothObject.clothName = '';
      this.clothObject.color = '';
      this.clothObject.patternColor = '';
      this.clothObject.patternSpecial = '';
      this.clothObject.shade = '';
      this.clothObject.type = '';
      this.clothObject.fitting = '';
      this.clothObject.pattern = '';
      this.backgroundColor = '';
      this.linkColor = '';
      this.nameitem = '';
      this.encoded = '';
      this.imgURL = '';
      this.clothObject.colorTag = '';
      localStorage.removeItem('Ctag');
      localStorage.removeItem('Cname')
      this.spinnerService.hide();
    }
    // console.log(this.ccc)
  })
}
// allgood() {
//   swal("Successful", "Record has been saved", "success");
// }
// failed() {
//   swal("Oopss", "Something went Wrong", "error");
// }

// loginFunction() {

//   console.log('object', this.userObject);
//   this.clothpaneldetail.addsignin(this.userObject).subscribe((res) => {
//     // console.log(res)
//     if (res.status == '0') {
//      // swal("Oopss", res.message, "error");
//       // this.loginfailToast(res.message);
//     } else if (res.userExist.active == false) {
//      // swal("Oopss", res.message, "error");


//       // } else if (res.userExist.isFirstlogin == false) {

//       //   this.signinNav();
//       //   this.presentToast();
//       //   this.userObject.username = '';
//       //   this.userObject.password = '';
//       //   localStorage.setItem('accesstoken', res.token.access_token);
//       //   localStorage.setItem('Refreshtoken', res.token.refresh_token);
//       //   localStorage.setItem('tokenExpiry', res.token.expires_in);
//       //   localStorage.setItem('UserID', res.userExist.id);
//       //   localStorage.setItem('Username', res.userExist.fullName);
//       //   localStorage.setItem('temp', res.userExist.settings.temp);
//       //   localStorage.setItem('email', res.userExist.email);
//       //   localStorage.setItem('phone',res.userExist.number)
//       //   localStorage.setItem('FL',res.userExist.isFirstlogin)




//     }
//     else {

//       this.login = true;
//       // swal("Successful",res.message, "success");
//       this.userObject.username = '';
//       this.userObject.password = '';
//       localStorage.setItem('accesstoken', res.token.access_token);
//       localStorage.setItem('Username', res.userExist.fullName);
//       this.naam=localStorage.getItem('Username');
//       // this.events.publish('setimagename');
//       // localStorage.setItem('Refreshtoken', res.token.refresh_token);
//       // localStorage.setItem('tokenExpiry', res.token.expires_in);
//       // localStorage.setItem('UserID', res.userExist.id);
//       // localStorage.setItem('Username', res.userExist.fullName);
//       // localStorage.setItem('temp', res.userExist.settings.temp);
//       // localStorage.setItem('email', res.userExist.email);
//       // localStorage.setItem('phone',res.userExist.number);
//       // localStorage.setItem('FL',res.userExist.isFirstlogin)
//       this.getClothdetails();

//     }
//   });
// }
logout() {
  localStorage.clear();
  this.login = false;
}

}
