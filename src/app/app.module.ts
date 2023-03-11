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
import { CustomerFeeComponent } from './customer/customer-invoice/customer-fee/customer-fee.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { CustomerPartsComponent } from './customer/customer-invoice/customer-parts/customer-parts.component';
import { CustomerInfoComponent } from './customer/customer-invoice/customer-info/customer-info.component';
import { CustomerVehicleComponent } from './customer/customer-invoice/customer-vehicle/customer-vehicle.component';
import { CurrencyDirective } from './currency.directive';
import { CurrencyPipe } from "@angular/common"
import {HttpInterceptorService} from "./service/http-interceptor.service";
import { LoginComponent } from './login/login.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { CustomerHistoryComponent } from './customer/customer-history/customer-history.component';
import { CustomerInvoiceComponent } from './customer/customer-invoice/customer-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerFeeComponent,
    CustomerPartsComponent,
    CustomerInfoComponent,
    CustomerVehicleComponent,
    CurrencyDirective,
    LoginComponent,
    CustomerHomeComponent,
    CustomerHistoryComponent,
    CustomerInvoiceComponent,
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
        MatFormFieldModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatGridListModule,
        MatSelectModule,
        MatDialogModule,
        HttpClientModule,
        MatAutocompleteModule
    ],
  providers: [
      CurrencyPipe,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
