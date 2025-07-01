import { Component } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { BrowseAuctionService } from './browse-auction.service';

@Component({
  selector: 'app-browse-auction',
  templateUrl: './browse-auction.component.html',
  styleUrls: ['./browse-auction.component.scss']
})
export class BrowseAuctionComponent {

    slavageList: any[] = [];
  constructor(private service: BrowseAuctionService,private router : Router) { }
  
    ngOnInit() {
      this.getUpcomingSalvages();

    }

    goBack() {
      window.history.back();
    };
    
    viewDetails(item: any) {
      console.log(item);
      this.router.navigate(['/view-auction', {
      salvageId: btoa(item.salvageId)
      }]);
    }

  searchAuction(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);
    if (searchTerm && this.slavageList.length > 0) {
      this.slavageList = this.slavageList.filter((item: any) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.getUpcomingSalvages();
    }
  }
    getUpcomingSalvages() {
    this.service.getUpcomingSalvages().subscribe((res: any) => {
      this.slavageList = res.data;
    });
  }
}
