import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bidder-dashboard',
  templateUrl: './bidder-dashboard.component.html',
  styleUrls: ['./bidder-dashboard.component.scss']
})
export class BidderDashboardComponent implements OnInit {
  constructor(private service: DashboardService) { }
  isDropdownOpen = false;
  activeTab: any;
  userDetails: any;
  userId: any;
  bidderData: any;
  myAuctionItems: any;
  watchListItems: any;
  wonItems: any;
  router = inject(Router);


  ngOnInit() {
    this.activeTab = 'my_auctions';
    this.userDetails = JSON.parse(sessionStorage.getItem('UserDetails') || '{}');
    this.userId = this.userDetails.userId;
    this.service.getBidderDashboardData(this.userId).subscribe((res: any) => {
      this.bidderData = res.data;
    });
    this.service.getByIdSalvage(this.userId).subscribe((res: any) => {
      this.myAuctionItems = res.data;
    });
    this.service.getWatchList(this.userId).subscribe((res: any) => {
      this.watchListItems = res.data;
    });
    this.service.getWonItems(this.userId).subscribe((res: any) => {
      this.wonItems = res.data;
    });
  }

  viewAuction(Id: any) {
    this.router.navigate(['/view-auction', {
      salvageId: btoa(Id)
    }]);
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  searchAuction(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm, this.myAuctionItems);
    if (this.activeTab === 'my_auctions') { 
      if (searchTerm) {
        this.myAuctionItems = this.myAuctionItems.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm)
        );
      }
      else {
        this.service.getByIdSalvage(this.userId).subscribe((res: any) => {
          this.myAuctionItems = res.data;
        });
      }
    }
    if (this.activeTab === 'watchlist') {
      if (searchTerm) {
        this.watchListItems = this.watchListItems.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm)
        );
      }
      else {
        this.service.getWatchList(this.userId).subscribe((res: any) => {
          this.watchListItems = res.data;
        });
      }
    }
    if (this.activeTab === 'won_items') {
      if (searchTerm) {
        this.wonItems = this.wonItems.filter((item: any) =>
          item.salvageTitle.toLowerCase().includes(searchTerm)
        );
      }
      else {
        this.service.getWonItems(this.userId).subscribe((res: any) => {
          this.wonItems = res.data;
        });
      }
    }
  }
}
