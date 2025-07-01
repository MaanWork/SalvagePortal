import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ApiService } from 'src/app/core/service/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseAuctionService {

  constructor(private service : ApiService) { }


  getUpcomingSalvages() {
    return this.service.get(API_ENDPOINTS.SALVAGES_AUCTION.UPCOMING_SALVAGES)
  }
}
