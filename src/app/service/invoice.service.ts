import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    async checkLogin(data: any): Promise<any> {
        return this.http.post(this.baseUrl + '/api/v1/auth/authenticate', data).toPromise();
    }

    submitForm() {
        this.http.get(this.baseUrl + '/api/v1/greetings')
            .subscribe(
                data => console.log(data),
                error => console.log("Error", error)
            )
    }
}
