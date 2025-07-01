import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionViewComponent } from './auction-view.component';

describe('AuctionViewComponent', () => {
  let component: AuctionViewComponent;
  let fixture: ComponentFixture<AuctionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionViewComponent]
    });
    fixture = TestBed.createComponent(AuctionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
