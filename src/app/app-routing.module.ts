import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CustomerComponent} from "./customer/customer.component";
import {CustomerHomeComponent} from "./customer/customer-home/customer-home.component";
import {CustomerHistoryComponent} from "./customer/customer-history/customer-history.component";
import {CustomerInvoiceComponent} from "./customer/customer-invoice/customer-invoice.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'customer', component: CustomerComponent, children: [
        { path: 'home', component: CustomerHomeComponent },
        { path: 'invoice', component: CustomerInvoiceComponent},
        { path: 'history', component: CustomerHistoryComponent},
    ]},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
