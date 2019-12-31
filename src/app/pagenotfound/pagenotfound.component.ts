import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.querySelector('.cont_principal').className= "cont_principal cont_error_active"; 
  }

}
