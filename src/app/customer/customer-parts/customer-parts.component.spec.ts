import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPartsComponent } from './customer-parts.component';

describe('CustomerPartsComponent', () => {
  let component: CustomerPartsComponent;
  let fixture: ComponentFixture<CustomerPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
