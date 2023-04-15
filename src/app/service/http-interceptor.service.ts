import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('/login') || req.url.includes('/authenticate')) {
            return next.handle(req);
        }

        //TODO Grab Token dynamically somewhere
        const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', localStorage.getItem('accessToken') ?? '')

        const newRequest = req.clone({headers})
        return next.handle(newRequest);
    }

  constructor() { }
}
