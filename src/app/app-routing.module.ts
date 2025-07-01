import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuctionViewComponent } from './pages/auction-view/auction-view.component';
import { BidderDashboardComponent } from './pages/dashboard/bidder-dashboard/bidder-dashboard.component';
import { InscDashboardComponent } from './pages/dashboard/insc-dashboard/insc-dashboard.component';
import { CreateAuctionComponent } from './pages/create-auction/create-auction.component';
import { BrowseAuctionComponent } from './pages/browse-auction/browse-auction.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path :'view-auction',
    component :AuctionViewComponent   
  },
  {
    path : 'browse-auction',
    component : BrowseAuctionComponent
  },
  {
    path : 'create-auction',
    component : CreateAuctionComponent
  },
  {
    path : 'view-dashboard',
    component : InscDashboardComponent
  },
  {
    path : 'bidder-dashboard',
    component : BidderDashboardComponent
  },
  {
    path : '**',
    redirectTo : 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
