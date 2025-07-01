import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insc-dashboard',
  templateUrl: './insc-dashboard.component.html',
  styleUrls: ['./insc-dashboard.component.scss']
})
export class InscDashboardComponent implements OnInit {
  activeTab: any = 'salvage_items';
  isDropdownOpen = false;
  userDetails: any;
  userId: any;
  role :any;
  service = inject(DashboardService);
  route = inject(Router);
  companyData: any;

  salvageItems: any;
  bidderApprovalItems: any;
  auctionResults: any;
  WinnerListPopup!: boolean;
  WinnerList: any;

  //  'APPROVER', 'SUPER_ADMIN', ADMIN

   approverStatus:boolean = false;
   superAdminStatus:boolean = false;
   adminStatus:boolean = false;

  dropdownIndex: number | null = null;
  winnerData: any;

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('UserDetails') || '{}');
    this.role = this.userDetails.role;
    console.log('userDetails', this.role);
    this.userId = this.userDetails.userId;
    this.service.getCompanyDashboardData().subscribe((res: any) => {
      this.companyData = res.data;
      console.log('companyData', this.companyData);
    });
    this.service.getByIdAuction().subscribe((res: any) => {
      this.salvageItems = res.data;
      console.log('salvageItems', this.salvageItems);
    });
    this.service.getBidderApproval(this.userId).subscribe((res: any) => {
      this.bidderApprovalItems = res.data;
      console.log('bidderApprovalItems', this.bidderApprovalItems);
    });
    this.service.getWinningSalvage(this.userId).subscribe((res: any) => {
      this.auctionResults = res.data;
      console.log('auctionResults', this.auctionResults);
      // 'APPROVER', 'SUPER_ADMIN', ADMIN
      console.log(this.role);
      // PENDING,
      // DECLARED_BY_ADMIN,
      // ACCEPTED_BY_SUPER_ADMIN,
      // REJECTED_BY_SUPER_ADMIN,
      // APPROVED_BY_APPROVER,
      // REJECTED_BY_APPROVER
      console.log(this.role);
      
    });
  }

  ngOnChanges() {
    if (this.WinnerListPopup) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.closeDropdownOutside.bind(this));
  }


  searchAuction(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm, this.salvageItems);
    if (this.activeTab === 'salvage_items') {
      if (searchTerm) {
        this.salvageItems = this.salvageItems.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm)
        );
      } else {
        this.ngOnInit();
      }
    } else if (this.activeTab === 'bidderApproval') {
      if (searchTerm) {
        this.bidderApprovalItems = this.bidderApprovalItems.filter((item: any) =>
          item.salvageTitle.toLowerCase().includes(searchTerm)
        );
      } else {
        this.ngOnInit();
      }
    } else if (this.activeTab === 'auctionResult') {
      if (searchTerm) {
        this.auctionResults = this.auctionResults.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm)
        );
      } else {
        this.ngOnInit();
      }
    }
  }
  
  closeDropdownOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('td')) {
      this.dropdownIndex = null;
    }
  }

  toggleDropdown(index: number): void {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }
  
  onEdit(item: any) {
    console.log('Edit:', item);
    this.dropdownIndex = null;
  }
  
  onView(item: any) {
    console.log('View:', item);
    this.dropdownIndex = null;
    
  }

  openPopup(data: any) {
    this.WinnerListPopup = true;
    this.WinnerList = data;
    console.log('WinnerList', this.WinnerList);
  }
  selectWinner(data: any) {
    console.log('selectWinner', data);
    this.winnerData = data;
  }
  declareWinnerAndClose(id:any) {
    this.WinnerListPopup = false;
    this.declareWinner(this.winnerData, id);
  }

  declareWinner(data: any,id?: any) {
    let payload = {
      "salvageId": data.salvageId || id,
      "userId": data.userId,
      "finalBid": data.bidAmount,
      "remarks": ""
    };
    this.service.declareWinner(payload).subscribe((res: any) => {
      if (res) {
        this.ngOnInit();
      }
    });
  }

  submit(id: any, status: any) {
    this.service.statusUpdate(id, status).subscribe((res: any) => {
      console.log('statusUpdate', res);
      if (res) {
        this.ngOnInit();
      }
    });
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['/login']);
  }
} 