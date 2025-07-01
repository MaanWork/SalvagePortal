import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';
import { ApiService } from 'src/app/core/service/common-service.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { Environments } from 'src/environment/environments';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private service : HttpClient,private auth:AuthService) { }

  BaseUrl = Environments.CommonApiUrl;

  getUpcomingSalvages() {
    const headers = this.getHttpHeaders();
    return this.service.get(this.BaseUrl + API_ENDPOINTS.SALVAGES_AUCTION.UPCOMING_SALVAGES,{ headers });
  }

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + (sessionStorage.getItem('TempToken') || '')
    });
  }

  getTemporaryTokens(): Observable<string> {
    const payload = {
      email: 'guest',
      password: 'Admin@01',
    };
    return this.auth.login(payload).pipe(
      map((response: any) => response.Result.token)
    );
  }


}
