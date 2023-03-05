import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, UntypedFormGroup, FormGroupDirective } from '@angular/forms';
import { ProductArithType } from 'src/app/shared/ProductArithType';

@Component({
  selector: 'customer-fee',
  templateUrl: './customer-fee.component.html',
  styleUrls: ['./customer-fee.component.css']
})
export class CustomerFeeComponent implements OnInit {

  form: UntypedFormGroup;
  @Input() formGroupName: string;

  @Output() sumChange = new EventEmitter<any>();

  constructor(private rootFormDirective: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as UntypedFormGroup;
  }

  emitSumChange() {
    var total = 0;
    var currValue = 0;

    for (const input in this.form.controls){
      currValue = Number.parseFloat(this.form.get(input)?.value.replace(/[^0-9.]+/g, ''));
      total += currValue
    }

    this.sumChange.emit(total);
  }
}
