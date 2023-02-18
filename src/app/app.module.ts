import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CustomerFeeComponent } from './customer/customer-fee/customer-fee.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { CustomerPartsComponent } from './customer/customer-parts/customer-parts.component';
import { CustomerInfoComponent } from './customer/customer-info/customer-info.component';
import { CustomerVehicleComponent } from './customer/customer-vehicle/customer-vehicle.component';
import { CurrencyDirective } from './currency.directive';
import { CurrencyPipe } from "@angular/common"

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerFeeComponent,
    CustomerPartsComponent,
    CustomerInfoComponent,
    CustomerVehicleComponent,
    CurrencyDirective,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSelectModule,
        MatDialogModule,
        HttpClientModule,
        MatAutocompleteModule
    ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
