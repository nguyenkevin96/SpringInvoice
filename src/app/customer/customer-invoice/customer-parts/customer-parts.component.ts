import { CurrencyPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { ProductArithType } from 'src/app/shared/ProductArithType';

export interface Part {
  name: string;
  quantity: number;
  price: string;
}

@Component({
  selector: 'app-customer-parts',
  templateUrl: './customer-parts.component.html',
  styleUrls: ['./customer-parts.component.css']
})
export class CustomerPartsComponent implements OnInit {

  partsForm: FormGroup;
  @Input() formGroupName: string;
  @Input() formArrayName: string;

  sum: number = 0
  @Output() sumChange = new EventEmitter<any>();

  @Input('resetForm') resetForm: Subject<any>;

  @ViewChild(MatTable) table: MatTable<Part>;

  customerParts: Part[] = []
  dataSourceCustomerParts = [...this.customerParts]
  columnNames: string[] = ['Name', 'Qty', 'Price']
  clickedProduct: any;

  total: number = 0;

  isRemove: Boolean = false;

  validForm = {
    isNameValid: true,
    isQuantityValid: true,
    isPriceValid: true
  }

  constructor(public dialog: MatDialog, private fb: FormBuilder, private http: HttpClient, private currencyPipe: CurrencyPipe) {
    this.partsForm = this.fb.group({
      product_name: ['', [Validators.required]],
      product_quantity: ['', [Validators.required]],
      product_price: ['', [Validators.required]]
    })
  }

  ngOnInit(): void { 
    this.resetForm.subscribe(e => {
      this.clearCustomerPartsList();
    })
  }

  addCarPart(){
    if(this.partsForm.valid){
      const newPart: Part = {
        name: this.partsForm.get('product_name')?.value,
        quantity: this.partsForm.get('product_quantity')?.value,
        price: this.partsForm.get('product_price')?.value,
      };
      this.customerParts.push(newPart)
      this.dataSourceCustomerParts = [...this.customerParts]

      this.emitSumChange(ProductArithType.ADD, this.parseStringToNumCurrency(newPart.price));
      this.resetValidForm();
      this.clearProductForm();
    } else {
      if(this.partsForm.get('product_name')?.errors){
        this.validForm.isNameValid = false;
      }
      if(this.partsForm.get('product_quantity')?.errors){
        this.validForm.isQuantityValid = false;
      }
      if(this.partsForm.get('product_price')?.errors){
        this.validForm.isPriceValid = false;
      }
      return;
    }
  }

  removeData() {
    this.dataSourceCustomerParts = this.dataSourceCustomerParts.filter((product) => product.name !== this.clickedProduct.name)
    this.customerParts = this.customerParts.filter((product) => product.name !== this.clickedProduct.name)

    this.emitSumChange(ProductArithType.REMOVE, this.parseStringToNumCurrency(this.clickedProduct.price))
    this.clickedProduct = null;
  }

  resetValidForm(){
    this.validForm = {
      isNameValid: true,
      isQuantityValid: true,
      isPriceValid: true
    }
  }

  displayFn(part: Part): string {
    return part && part.name ? part.name : '';
  }

  parseStringToNumCurrency(price: string): number {
    //Start past the '$'
    price = price.substring(1, price.length)
    console.log("Parsed: ", price)

    return parseFloat(price);
  }

  updateInputField() {
    const parsedInput = this.currencyPipe.transform(this.partsForm.get('product_price')?.value, 'USD')!;
    this.partsForm.get('product_price')?.setValue(parsedInput, {emitEvent: false});
  }

  emitSumChange(type: ProductArithType, value: number) {

    if(type === ProductArithType.ADD){
      this.total += value;
    } else if (type === ProductArithType.REMOVE && this.total != 0){
      this.total -= value;
    }

    this.sumChange.emit(this.total);
  }

  setClickedPart(part: Part){
    this.clickedProduct = part;
  }

  clearCustomerPartsList() {
    this.customerParts = []
    this.dataSourceCustomerParts = [...this.customerParts]
    this.table.renderRows();
  }

  clearProductForm() {
    this.partsForm.reset()
  }

  get productName(){
    return this.partsForm.get('product_name')?.value
  }

  get productQuantity(){
    return this.partsForm.get('product_quantity')?.value
  }

  get productPrice(){
    return this.partsForm.get('product_price')?.value
  }
}
