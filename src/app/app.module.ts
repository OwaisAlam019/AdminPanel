import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { ClothesService } from './service/clothing/clothes.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { ClothingpanelComponent } from './clothingpanel/clothingpanel.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import Swal from 'sweetalert2'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ConfigService } from './service/config.service';
import { InterceptorService } from './service/middleware/interceptor.service';
import { RegistrationService } from './service/Auth/registration.service';
import { AuthGuardService } from './service/Auth/auth-guard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DatacountsService } from './service/counts/datacounts.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { CryptoService } from './service/Encryption/crypto.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    DashboardComponent,
    LandingComponent,
    ClothingpanelComponent,
    SidenavComponent,
    ToolbarComponent,
    PagenotfoundComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    // HttpModule,
    HttpClientModule,
    // LayoutModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatIconModule,
    // MatListModule,
    // MatCheckboxModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatTooltipModule,
    // MatTreeModule,
    // PortalModule,

    [Ng4LoadingSpinnerModule.forRoot()]
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ClothesService,
  ConfigService,
  RegistrationService,
  AuthGuardService,
  DatacountsService,
  CryptoService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
