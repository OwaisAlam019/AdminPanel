import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../service/Encryption/crypto.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
name;
  constructor(public enc : CryptoService) { }

  ngOnInit() {
    this.name=this.enc.getItem("Username")
  }
logout(){
  localStorage.clear();
}
}
