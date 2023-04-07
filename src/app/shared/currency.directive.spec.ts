import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrencyDirective } from './currency.directive';

@Component({
  template: `<p [appCurrency]="value"></p>`
})
class TestCurrencyComponent {
  value = 9223.00;
}

describe('CurrencyDirective', () => {
  let component: TestCurrencyComponent;
  let fixture: ComponentFixture<TestCurrencyComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCurrencyComponent, CurrencyDirective]
    });
    fixture = TestBed.createComponent(TestCurrencyComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(CurrencyDirective));
  });

  it('should display the value as currency', () => {
    fixture.detectChanges();
    expect(element.nativeElement.textContent).toBe('$9,223.00');
  });
});
