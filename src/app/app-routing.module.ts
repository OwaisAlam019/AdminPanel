import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothingpanelComponent } from './clothingpanel/clothingpanel.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuardService } from './service/Auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'clothpanel', component: ClothingpanelComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'welcome', component: LandingComponent  },
  { path: '404', component: PagenotfoundComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
  // ,
  // {path:'',redirectTo:'welcome',pathMatch:'full'}];
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
