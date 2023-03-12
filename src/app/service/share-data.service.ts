import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

    constructor() { }

    getToken() {
        localStorage.getItem('accessToken')
    }
}
