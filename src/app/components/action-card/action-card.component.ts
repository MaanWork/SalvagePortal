import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auction-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent {
  @Input() title: string = '';
  @Input() companyName: string = '';
  @Input() description: string = '';
  @Input() minimumBidAmount: number = 0;
  @Input() incrementValue: number = 0;
  @Input() biddingStart: string = '';
  @Input() biddingEnd: string = '';
  @Input() imageUrl: string = '';
  @Output() viewDetails = new EventEmitter<any>();
}
