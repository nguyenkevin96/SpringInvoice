import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Part} from "../customer/customer-parts/customer-parts.component";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) {

    }

    addNewPart(newPart: Part) {
        let requestUrl = "http://localhost:8080/part"
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')

        this.http.post(requestUrl, newPart, {'headers': headers}).subscribe(data => {
                console.log(`${newPart.name} successfully added`)
            }
        )
    }
}
