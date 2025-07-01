import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../core/constants/api-endpoints';
import { ApiService } from '../core/service/common-service.service';
import { Environments } from 'src/environment/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(private service : HttpClient) { }
    BaseUrl = Environments.CommonApiUrl;
  
    login(request?: any) {
      return this.service.post(this.BaseUrl+API_ENDPOINTS.AUTH.LOGIN, request);
    }
  

}