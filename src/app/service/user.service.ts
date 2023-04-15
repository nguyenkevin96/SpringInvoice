import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor() { }

    public isAuthenticated(): boolean {
        let token = localStorage.getItem('accessToken');
        if(token) {
            const decodedToken: any = jwtDecode(token);
            const expTimestamp = decodedToken['exp'];
            const expDate = new Date(expTimestamp * 1000);
            console.log(expDate)

            const currDate = new Date();

            if(expDate > currDate){
                console.log("Return isAuthenticated")
                return true;
            }
        }

        return false;
    }
}
