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
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZpbkBlbWFpbC5jb20iLCJpYXQiOjE2Nzg1NTYyODEsImV4cCI6MTY3ODU1NzcyMX0.fpcT1a9JE8Y_QkOC_tJac-CMLbMSchUO8UJXNOrjWp4')

        const newRequest = req.clone({headers})
        return next.handle(newRequest);
    }

  constructor() { }
}
