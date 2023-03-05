import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-customer-vehicle',
  templateUrl: './customer-vehicle.component.html',
  styleUrls: ['./customer-vehicle.component.css']
})
export class CustomerVehicleComponent implements OnInit {

  form: UntypedFormGroup;
  @Input() formGroupName: string;

  constructor(private rootFormDirective: FormGroupDirective,) { }

  ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as UntypedFormGroup;
  }

}
