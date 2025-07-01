import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  slavageList: any[] = [];
  constructor(private service: HomeService, private router: Router) { }

  ngOnInit() {
    this.service.getTemporaryTokens().subscribe(token => {
      sessionStorage.setItem('TempToken', token);
      setTimeout(() => {
        this.getUpcomingSalvages();
      }, 0);
    });
  }

  getUpcomingSalvages() {
    this.service.getUpcomingSalvages().subscribe((res: any) => {
      this.slavageList = res.data;
    });
  }

  viewDetails(item: any) {
    this.router.navigate(['/view-auction', {
      salvageId: btoa(item.salvageId)
    }]);
  }
}
