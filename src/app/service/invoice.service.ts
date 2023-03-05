import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Part} from "../customer/customer-invoice/customer-parts/customer-parts.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {

    }

    submitForm() {
        this.http.get(this.baseUrl + '/api/v1/greetings')
            .subscribe(
                data => console.log(data),
                error => console.log("Error", error)
            )
    }
}
