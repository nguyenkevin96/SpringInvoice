import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeeComponent } from './customer-fee.component';

describe('CustomerFeeComponent', () => {
  let component: CustomerFeeComponent;
  let fixture: ComponentFixture<CustomerFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
