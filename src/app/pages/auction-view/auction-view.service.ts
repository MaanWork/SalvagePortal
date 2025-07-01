import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ApiService } from 'src/app/core/service/common-service.service';
import { Environments } from 'src/environment/environments';

@Injectable({
  providedIn: 'root'
})
export class AuctionViewService {

  constructor(private service: ApiService) { }

  BaseUrl = Environments.CommonApiUrl;

  getSalvage(Id?: any) {
    return this.service.get(API_ENDPOINTS.SALVAGES_AUCTION.AUCTION_VIEW(Id),'view-auction');
  }

  getBidHistory(Id?: any) {
    return this.service.get(API_ENDPOINTS.SALVAGES_AUCTION.BID_HISTORY(Id));
  }

  participateInBidding(payload: any) {
    return this.service.post(API_ENDPOINTS.SALVAGES_AUCTION.PARTICIPATE_IN_BIDDING, payload);
  }

  placeBid(Id: any, payload: any) {
    return this.service.post(API_ENDPOINTS.SALVAGES_AUCTION.PLACE_BID(Id), payload);
  }

  addwatchlist(payload: any) {
    return this.service.post(API_ENDPOINTS.SALVAGES_AUCTION.ADD_WATCHLIST, payload);
  }
}
