import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ApiService } from 'src/app/core/service/common-service.service';
import { Environments } from "../../../environment/environments";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private service : ApiService,private http : HttpClient) { }

  BaseUrl = Environments.CommonApiUrl;

  create(request?: any) {
    return this.http.post( this.BaseUrl + API_ENDPOINTS.REGISTER.CREATE_USER, request);
  }
}
