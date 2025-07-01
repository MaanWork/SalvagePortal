import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscDashboardComponent } from './insc-dashboard.component';

describe('InscDashboardComponent', () => {
  let component: InscDashboardComponent;
  let fixture: ComponentFixture<InscDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscDashboardComponent]
    });
    fixture = TestBed.createComponent(InscDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
