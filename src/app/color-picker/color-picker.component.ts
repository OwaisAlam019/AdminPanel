import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClothesService } from '../service/clothing/clothes.service';
import { CryptoService } from '../service/Encryption/crypto.service';


@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  @Input() heading: string;
  @Input() color: string;
  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  public defaultColors: any[] = [];
  public Colors: any[];
  public tags: any[] = [];
  public names: any[] = [];
  public show = false;
  combine: any = [];
  public c: any;
  public Sectags: any[] = [];
  public Secnames: any[] = [];
  public SecColors: any[];
  constructor(public clothpaneldetail: ClothesService,public enc : CryptoService) {  this.getClothdetails(); }

  ngOnInit() {
  }
  getClothdetails() {

    this.clothpaneldetail.getdetails().subscribe((res) => {
      this.Colors = res.data.colors;
      // console.log(res.data.colors.colorTag)
      // console.log( this.Colors)
      for (var key in this.Colors) {
        this.defaultColors.push(this.Colors[key].hex);
      }
      for (var i in this.Colors) {
        this.tags.push(this.Colors[i].colorTag);
      }
      for (var j in this.Colors) {
        this.names.push(this.Colors[j].name);
      }
      //  console.log(this.names);
    });

  }
  /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    this.color = color;
    this.event.emit(this.color);
    this.show = false;
    if(this.enc.getItem('SC',true) != 'SC'){
    for (var id in this.defaultColors) {
      if (this.color == this.defaultColors[id]) {
        // console.log(this.tags[id]);
        this.enc.setItem('Ctag', this.tags[id],true);
        this.enc.setItem('Cname', this.names[id],true);
        this.c = this.names[id];
      }
    }}
    if (this.enc.getItem('SC',true) == "SC") {
      // console.log('--------------');

      this.SecColors = this.defaultColors;
      // console.log('**',this.SecColors)
      for (var i in this.Colors) {
        this.Sectags.push(this.Colors[i].colorTag);
        // console.log('**tags',this.Sectags)
      }
      for (var j in this.Colors) {
        this.Secnames.push(this.Colors[j].name);
        // console.log('**name',this.Secnames)
      }
      for (var id in this.SecColors) {
       
        if (this.color == this.SecColors[id]) {
         
      //  console.log(this.color);
          this.enc.setItem('SeckCtag', this.Sectags[id],true);
          this.enc.setItem('SecCname', this.Secnames[id],true);
              this.c = this.names[id];
          //   }
          // }

        }
      }
    }
  }

  /**
   * Change color from input
   * @param {string} color
   */
   
    public changeColorManual(color: string): void {
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

    if (isValid) {
      this.color = color;
      this.event.emit(this.color);
    }
  }

  /**
   * Change status of visibility to color picker
   */
  public toggleColors(): void {
    this.show = !this.show;
    // for(var id in this.combine.hex)
    // if(this.color==this.combine[id].hex){
    //   console.log(this.combine[id].tag)

    // }
  }
}
