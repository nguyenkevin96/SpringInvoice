import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //TODO Grab Token dynamically somewhere
        const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZpbkBlbWFpbC5jb20iLCJpYXQiOjE2NzgwNDE1NjQsImV4cCI6MTY3ODA0MzAwNH0._6R1aOtWUB3yQx8v6F98QWTA_b8txoTQhvaV8sJBClg')

        const newRequest = req.clone({headers})
        return next.handle(newRequest);
    }



  constructor() { }
}
