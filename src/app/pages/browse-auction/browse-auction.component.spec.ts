import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAuctionComponent } from './browse-auction.component';

describe('BrowseAuctionComponent', () => {
  let component: BrowseAuctionComponent;
  let fixture: ComponentFixture<BrowseAuctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseAuctionComponent]
    });
    fixture = TestBed.createComponent(BrowseAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
