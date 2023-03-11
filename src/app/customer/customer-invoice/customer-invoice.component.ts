import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {CustomerPartsComponent} from "./customer-parts/customer-parts.component";
import {InvoiceService} from "../../service/invoice.service";

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {

    customerForm: UntypedFormGroup;
    selectedPart: any;
    button: string;
    list: UntypedFormArray = this.fb.array([])
    resetForm: Subject<any> = new Subject();

    productPartsTotal: any = 0;
    customerFeeTotal: any = 0;

    @ViewChild(CustomerPartsComponent) private customerPartsComponent: CustomerPartsComponent

    constructor(private fb: UntypedFormBuilder, private invoiceService: InvoiceService) {
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
                receivedDate: [''],
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

        this.invoiceService.submitForm();

        this.customerForm.reset();
        this.customerPartsComponent.customerParts = [];
        this.resetForm.next();
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
