import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ApiService } from 'src/app/core/service/common-service.service';
import { Environments } from 'src/environment/environments';

@Injectable({
  providedIn: 'root'
})
export class CreateAuctionService {

  constructor(private service: ApiService) { }

  BaseUrl = Environments.CommonApiUrl;

  create(request?: any) {
    return this.service.post(API_ENDPOINTS.SALVAGES_AUCTION.CREATE, request);
  }

  uploadImage(Id: any, request: any) {
    return this.service.uploadImage(API_ENDPOINTS.SALVAGES_AUCTION.UPLOAD_IMAGE(Id), request);
  }

  getVechileCondition() {
    return this.service.get(API_ENDPOINTS.DROP_DOWN.GET_CONDITION)
  }

  getCountry() {
    return this.service.get(API_ENDPOINTS.LOCATION.GET_COUNTRY);
  }

  getRegion(countryId: any) {
    return this.service.get(API_ENDPOINTS.LOCATION.GET_REGION(countryId));
  }

  getDistricts(regionId: any) {
    return this.service.get(API_ENDPOINTS.LOCATION.GET_DISTRICTS(regionId));
  }

}
