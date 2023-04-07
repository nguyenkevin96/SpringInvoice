import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[currencyInput]'
})
export class CurrencyDirective {

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef, private currencyPipe: CurrencyPipe) {
    this.el = this.elementRef.nativeElement;
  }

  @Input() currencyInput: string;

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
      this.el.value = value.replace(/[^0-9.]+/g, '');
      if(!value){
          this.el.value = '0';
      }
      this.el.select();
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
      value = value.replace(/[^0-9.]+/g, '');

      if(!value){
          value = '0';
      }

      this.el.value = this.currencyPipe.transform(value, 'USD')!;
  }
}
