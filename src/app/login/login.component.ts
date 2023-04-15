import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {InvoiceService} from "../service/invoice.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    responseData: any;
    invalidPrompt: string;
    loading: boolean = false;
    error: boolean = false;

    constructor(private router: Router, private invoiceService: InvoiceService,
              private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    async onLogin() {
        this.error = false;
        this.loading = true;

        const data = {
            email: this.username?.value,
            password: this.password?.value
        }

        try{
            await this.invoiceService.checkLogin(data).then(response => {
                if(response.message === 'success') {
                    localStorage.setItem('accessToken', 'Bearer ' + response.token);
                    this.router.navigate(['/customer/home']);
                }
            });
        } catch (error) {
            this.error = true;
        }

        this.loading = false;
    }

    get username() {
        return this.loginForm.get("username");
    }

    get password() {
        return this.loginForm.get("password");
    }
}
