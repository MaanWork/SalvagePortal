import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ActionCardComponent } from './components/action-card/action-card.component';
import { PrimaryBtnComponent } from './components/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from './components/secondary-btn/secondary-btn.component';
import { LoginComponent } from './auth/login/login.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuctionViewComponent } from './pages/auction-view/auction-view.component';
import { InscDashboardComponent } from './pages/dashboard/insc-dashboard/insc-dashboard.component';
import { BidderDashboardComponent } from './pages/dashboard/bidder-dashboard/bidder-dashboard.component';
import { CreateAuctionComponent } from './pages/create-auction/create-auction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './core/service/common-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowseAuctionComponent } from './pages/browse-auction/browse-auction.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoadingInterceptor } from './core/interceptors/loader';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActionCardComponent,
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    LoginComponent,
    InfoCardComponent,
    RegisterComponent,
    AuctionViewComponent,
    InscDashboardComponent,
    BidderDashboardComponent,
    CreateAuctionComponent,
    BrowseAuctionComponent,
    LoaderComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    AuctionViewComponent
  ],
  providers: [
    ApiService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
