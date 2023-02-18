import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  form: FormGroup;
  @Input() formGroupName: string;

  constructor(private rootFormDirective: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormDirective.control.get(this.formGroupName) as FormGroup;
  }

}
