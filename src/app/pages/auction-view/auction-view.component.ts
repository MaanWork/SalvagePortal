import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionViewService } from './auction-view.service';
import { Environments } from 'src/environment/environments';

@Component({
  selector: 'app-auction-view',
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.scss']
})
export class AuctionViewComponent implements OnInit {

  vehicleImg: string = '';
  selectedIndex: number = 0;
  activeTab: string = 'details';
  salvageId: any;

  salvageData: any;

  route = inject(Router);
  activeRoute = inject(ActivatedRoute);

  service = inject(AuctionViewService);

  BaseUrl = Environments.CommonApiUrl;

  thumbnails: any[] = [];
  bidHistory: any;
  userDetails: any;


  zoomVisible = false;
  zoomStyles: any = {};
  zoomScale = 1;

  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('UserDetails') || '{}');
    this.activeRoute.params.subscribe(params => {
      this.salvageId = atob(params['salvageId']);
      if (params['salvageId']) {
        this.service.getSalvage(this.salvageId).subscribe((res: any) => {
          this.salvageData = res.data ;
          this.thumbnails = this.salvageData.images.map((img: any) => {
            return img.base64Image;
          });
          this.vehicleImg = this.thumbnails[0];
        });
        this.service.getBidHistory(this.salvageId).subscribe((res: any) => {
          this.bidHistory = res.data;
        });
      }
    });
  }

  particateInBidding(Id: any) {
    console.log(Id, this.userDetails);
    let payload = {
      "salvageId": Id,
      "userId": this.userDetails.userId,
      "reasonForParticipation": "none"
    }
    this.service.participateInBidding(payload).subscribe((res: any) => {
      console.log(res);
      alert('Participated in bidding successfully');
      window.history.back();
    });
  }

  onZoom(event: MouseEvent) {
    const container = this.imageContainer.nativeElement;
    const image = this.imageElement.nativeElement;
    const rect = container.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const bgX = (x / rect.width) * image.naturalWidth;
    const bgY = (y / rect.height) * image.naturalHeight;

    const zoomSize = 200;

    this.zoomStyles = {
      top: `${y - zoomSize / 2}px`,
      left: `${x - zoomSize / 2}px`,
      width: `${zoomSize}px`,
      height: `${zoomSize}px`,
      backgroundImage: `url('${this.vehicleImg}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${image.naturalWidth * this.zoomScale}px ${image.naturalHeight * this.zoomScale}px`,
      backgroundPosition: `-${bgX * this.zoomScale - zoomSize / 2}px -${bgY * this.zoomScale - zoomSize / 2}px`,
      border: '2px solid #fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
      position: 'absolute',
      pointerEvents: 'none',
      transition: 'background-position 0.1s ease'
    };

    this.zoomVisible = true;
  }

  onLeave() {
    this.zoomVisible = false;
  }

  getTimeLeft(biddingEnd: any) {
    const now = new Date();
    const end = new Date(biddingEnd);
    const diffMs = end.getTime() - now.getTime();

    if (diffMs <= 0) return 'Expired';

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

    return `${diffDays} days, ${diffHours} hours`;
  }

  placeBid(id: any, bidAmount: any) {
    let payload1 = {
      "amount": parseInt(bidAmount),
      "userId": this.userDetails.userId,
    }
    this.service.placeBid(id, payload1).subscribe((res: any) => {
      console.log(res);
      alert('Bid placed successfully');
      this.ngOnInit();
    });
  }


  back() {
    window.history.back();
  }

  watchList(data: any) {
    let payload = {
      "userId": this.userDetails.userId,
      "salvageId": data
    }
    this.service.addwatchlist(payload).subscribe((res: any) => {
      console.log(res);
      alert('Added to watchlist successfully');
        window.location.reload();
    });
  }

  changeImg(data: any) {
    this.vehicleImg = data.src;
  }

}
