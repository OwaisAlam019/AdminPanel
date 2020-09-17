import { Component, OnInit, ViewChild } from '@angular/core';
import { DatacountsService } from '../service/counts/datacounts.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ChartsModule } from 'ng2-charts';
import { CryptoService } from '../service/Encryption/crypto.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts'
import { ClothesService } from '../service/clothing/clothes.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }

    }
    // onResize:{}
    // chart.canvas.parentNode.style.height = '128px';
  };
  public barChartLabels: Label[] = ['Full suit with shirt and tie', 'Full suit with shirt'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [];
  show: boolean = false;
  sum: any;
  active;
  inactive;
  results: any = [];
  comresults: any = [];
  comData: any = [];
  comPattern: any = [];
  comRecom: any = [];
  inventory:any = []
  name;
  config: any;
  config_pattren: any;
  config_recom: any;
  config_inventory_table: any;
  key: any = [];
  b_Results: boolean = false;
  b_Com: boolean = false;
  b_Pattern: boolean = false;
  b_Recom: boolean = false;
  constructor(private spinnerService: Ng4LoadingSpinnerService, public count: DatacountsService, public enc: CryptoService,private clothService:ClothesService) {

  }
  public getInventory(){
    console.log("get inventory");
    
    this.clothService.getInventory().subscribe((res)=> {
      console.log(res,"response length");
      
     this.inventory = res.data

    })
    this.config_inventory_table = {
      id: 'inventory',
      itemsPerPage: 7,
      currentPage: 2,
      totalItems: this.inventory.count
    };
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public pie(): void {
    this.barChartType = this.barChartType === 'bar' ? 'pie' : 'bar';
    
  }
  public line(): void {
    this.barChartType = this.barChartType  ? 'line' : this.barChartType;
    
  }
  public doughnut(): void {
    this.barChartType = this.barChartType  ? 'doughnut' : this.barChartType;
    
  }
  public radar(): void {
    this.barChartType = this.barChartType  ? 'radar' : this.barChartType;
    
  }
  public polar(): void {
    this.barChartType = this.barChartType  ? 'polarArea' : this.barChartType;
    
  }
  
  

  ngOnInit() {
    this.CountofUser();
    this.CountofOutfits()
    this.CountofArticles();
    this.CountofPattrens();
    this.CountofCombination();
    this.CountofRecommendation();
    this.getInventory()
    this.name = this.enc.getItem("Username", true);

  }
  CountofUser() {
    this.count.getUser_Counts().subscribe((res) => {
      this.sum = res.data.total;
      this.active = res.data.active;
      this.inactive = res.data.inactive;
    })
  }
  CountofArticles() {
    this.count.getArticle_Counts().subscribe((res) => {
      this.results = res;
      this.b_Results = false;


    })
  }
  CountofCombination() {
    this.comresults = [];
    this.spinnerService.show();
    this.count.getCombinations_Counts().subscribe((res) => {
      // console.log('--', res);
      this.b_Com = false
      // this.comresults = res;
      for (var key in res) {
        this.comresults.push({ 'id': key, 'name': res[key].name, 'closet': res[key].closetCount, 'combination': res[key].combinationCount })
        //this.comresults.push({'id':this.key});
      }
      this.spinnerService.hide();
    })
    this.config = {
      id: 'first',
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.comresults.count
    };
  }
  CountofPattrens() {
    this.count.getPattrens_Counts().subscribe((res) => {
      // console.log(res)

      for (var key in res) {
        if (res[key].suit == "") {

          res[key].suit = "---"
        }
        if (res[key].shirt == "") {

          res[key].shirt = "---"
        }
        if (res[key].tie == "" || res[key].tie == null) {

          res[key].tie = "---"
        }
        this.comPattern.push({ 'id': key, 'suitType': res[key].suit, 'shirtType': res[key].shirt, 'tieType': res[key].tie, 'Count': res[key].count })

      }
    })
    this.config_pattren = {
      id: 'second',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.comPattern.count
    };
  }
  CountofOutfits() {
    this.spinnerService.show();
    this.count.getOutfits_Counts().subscribe((res) => {
      // console.log(res.outfits.complete)
      let data: any = [];
      data[0] = res.outfits.complete;
      data[1] = res.outfits.incomplete;
      this.barChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
      };
      this.barChartLabels = ['Full suit with shirt and tie', 'Full suit with shirt'];
      this.barChartData = [
        { data, label: 'Count', backgroundColor: "rgb(255, 201, 86)",hoverBackgroundColor:"rgb(243, 213, 150)" },
        //  { data: [28, 48, ], label: 'Series B' }
      ];
      this.show = true;
      // console.log('----', this.barChartData)
this.spinnerService.hide();
    }
    )
  }
  CountofRecommendation() {
    this.count.getRecommendation_Counts().subscribe((res) => {
      // console.log(res);
      for (var key in res) {
        if (res[key].pattern == '' || res[key].pattern == null) {
          res[key].pattern = "---"
        }
        this.comRecom.push({ 'id': key, 'used': res[key].used, 'color': res[key].color, 'clothType': res[key].clothType, 'pattren': res[key].pattern })
      }
      this.spinnerService.hide();
    })
    this.config_recom = {
      id: 'third',
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.comRecom.count
    };
  }
  search(word: string) {
    if (!word) {

      this.results = this.results;
      this.b_Results = false;
      this.CountofArticles();
    } else {
      this.results = this.results.filter(x =>
        x.clothType.trim().toLowerCase().includes(word.trim().toLowerCase()) 
      );

      if (this.results.length == 0) {
        this.b_Results = true;


      }
    }
  }
  searchCom(word: string) {
    if (!word) {

      this.comresults = this.comresults;
      this.comresults = []
      this.b_Com = false
      this.CountofCombination();

    } else {
      this.comresults = this.comresults.filter(x =>
        x.name.trim().toLowerCase().includes(word.trim().toLowerCase())

      );
      if (this.comresults.length == 0) {
        this.b_Com = true;


      }
    }
  }
  searchPattern(word: string) {
    if (!word) {
      this.comPattern=this.comPattern;
      this.comPattern=[];
      this.CountofPattrens();
      this.b_Pattern=false;
     

    } else {
      this.comPattern = this.comPattern.filter(x =>
        x.suitType.trim().toLowerCase().includes(word.trim().toLowerCase()) || x.shirtType.trim().toLowerCase().includes(word.trim().toLowerCase()) || x.tieType.trim().toLowerCase().includes(word.trim().toLowerCase())
      );
     
      if (this.comPattern.length == 0) {
        this.b_Pattern = true;


      }
    }
  }
  searchRecom(word: string) {
    if (!word) {

      this.comRecom = this.comRecom;
    this.comRecom=[];
    this.CountofRecommendation();
    this.b_Recom=false;
      

    } else {
      this.comRecom = this.comRecom.filter(x =>
        x.color.trim().toLowerCase().includes(word.trim().toLowerCase()) || x.clothType.trim().toLowerCase().includes(word.trim().toLowerCase()) || x.pattren.trim().toLowerCase().includes(word.trim().toLowerCase())

      );
      if (this.comRecom.length == 0) {
        this.b_Recom = true;


      }
    }
  }
  searchInventory(word: string) {
    if (!word) {

    //   this.comRecom = this.comRecom;
    // this.comRecom=[];
    // this.CountofRecommendation();
    this.getInventory()
    // this.b_Recom=false;
      

    } else {
      this.inventory = this.inventory.filter(x =>
        x.colorTag.trim().includes(word.trim()// || x.clothType.trim().toLowerCase().includes(word.trim().toLowerCase()) || x.pattren.trim().toLowerCase().includes(word.trim().toLowerCase()
        )

      );
      if (this.comRecom.length == 0) {
        this.b_Recom = true;


      }
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  pageChanged_recom(event) {
    this.config_pattren.currentPage = event;
  }
  pageChangedrecom(event) {
    this.config_recom.currentPage = event;
  }

  pageChangedInventory(event) {
    this.config_inventory_table.currentPage = event;
  }
  disableInventoryItem (itemId) {
    console.log(itemId,"item id ");
    this.clothService.disableInventoryItem(itemId).subscribe((res) => {
      console.log(res,"result");
      this.getInventory()
      
    })
    
  }

}




