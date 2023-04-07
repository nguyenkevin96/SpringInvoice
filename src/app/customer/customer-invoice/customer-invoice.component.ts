import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
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
                vinNumber: ['', [Validators.required]],
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
            carParts: this.fb.array([]),
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

    addToSum(item: any) {
        const part = this.fb.group({
            name: item.part.name,
            price: item.part.price,
            quantity: item.part.quantity
        });

        if(item.type === 'ADD') {
            this.carPartsList.push(part);
        } else if (item.type === 'REMOVE') {
            const index = this.carPartsList.controls.findIndex(x => x.value.name.toLowerCase() === item.part.name.toLowerCase());
            if (index >= 0) {
                this.carPartsList.removeAt(index);
            }
        }

        this.productPartsTotal = item.total;
    }

    addToCustomerFee(feeTotal: any) {
        this.customerFeeTotal = feeTotal;
    }

    get carPartsList(): FormArray {
        return this.customerForm.get('carParts') as FormArray;
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
