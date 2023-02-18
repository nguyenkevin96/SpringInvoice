import {Component, Input, OnChanges, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    FormControl,
    FormArray
} from "@angular/forms";
import {MatTable} from '@angular/material/table';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {InvoiceService} from "../service/invoice.service";
import {CustomerPartsComponent} from "../customer/customer-parts/customer-parts.component"
import { Subject } from 'rxjs';
import { ProductArithType } from '../shared/ProductArithType';

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    customerForm: FormGroup;
    selectedPart: any;
    button: string;
    list: FormArray = this.fb.array([])
    resetForm: Subject<any> = new Subject();
    
    productPartsTotal: any = 0;
    customerFeeTotal: any = 0;

    @ViewChild(CustomerPartsComponent) private customerPartsComponent: CustomerPartsComponent

    constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
        this.customerForm = this.fb.group({
            customerInfo: this.fb.group({
                name: [''],
                phone: ['', [Validators.required]],
                address: [''],
                city: [''],
                state: [''],
                zip: [''],
                email: [''],
            }),
            customerVehicleInfo: this.fb.group({
                receivedDate: new FormControl(''),
                year_make_model: [''],
                vinNumber: [''],
                licenseNo: [''],
                odometer: [''],
            }),
            feesList: this.fb.group({
                labor: [formatter.format(0)],
                parts: [formatter.format(0)],
                accessories: [formatter.format(0)],
                gas_oil_grease: [formatter.format(0)],
                misc_merchandise: [formatter.format(0)],
                tow: [formatter.format(0)],
                tax: [formatter.format(0)],
            }),
            total: ['0']
        });
    }

    ngOnInit(): void {
        console.log("Getting information..")
    }

    onSubmit(button: string): void {
        console.log(`Submitted customer form`, this.customerForm.value)
        console.log(this.customerPartsComponent.customerParts)

        this.customerForm.reset();
        this.customerPartsComponent.customerParts = [];
        this.resetForm.next();
    }

    toggleDatePicker($event: MatDatepickerInputEvent<any | null>) {
        this.customerForm.get('receivedDate')?.setValue($event.value)
    }

    addToSum(productTotal: any) {
        this.productPartsTotal = productTotal;
    }

    addToCustomerFee(feeTotal: any) {
        this.customerFeeTotal = feeTotal;
    }

    get currDate() {
        const date = new Date();
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    get refactoredTotal() {
        var total = this.productPartsTotal + this.customerFeeTotal;
        this.customerForm.get('total')?.setValue(total);

        return formatter.format(this.customerForm.get('total')?.value)
    }
}
