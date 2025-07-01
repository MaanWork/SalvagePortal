import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ApiService } from 'src/app/core/service/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private service: ApiService) { }


  // Bidder Dashboard
  getBidderDashboardData(Id: any) {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_BIDDER_DASHBOARD(Id));
  }
  getByIdSalvage(Id: any) {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_BY_ID_AUCTON(Id));
  }
  getByIdAuction() {
    return this.service.get(API_ENDPOINTS.SALVAGES_AUCTION.GET_ALL_SALVAGES);
  }
  getWatchList(Id: any) {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_WATCH_LIST(Id));
  }
  getWonItems(Id: any) {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_WON_ITEMS(Id));
  }







  getCompanyDashboardData() {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_COMPANY_DASHBOARD);
  }
  getBidderApproval(Id: any) {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_BIDDER_APPROVAL(Id));
  }
  getWinningSalvage(Id: any) {
    return this.service.get(API_ENDPOINTS.DASHBOARD.GET_WINNING_AUCTION(Id));
  }

  declareWinner(payload: any) {
    return this.service.post(API_ENDPOINTS.DASHBOARD.DECLARE_WINNER, payload);
  }



  statusUpdate(id: any, status: any) {
    return this.service.put(API_ENDPOINTS.DASHBOARD.STATUS_UPDATE(id, status), {});
  }


}
