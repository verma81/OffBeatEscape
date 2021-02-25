import { Injectable } from '@angular/core';
import * as moment from 'moment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenService {

    tokenExpiryTime: any;

    setJWTTokenInLocalStorage(responseObj: any): void {
        const expiresIn = moment(new Date()).add(1, 'minutes');
        this.tokenExpiryTime = expiresIn;
        localStorage.setItem('jwt-token', responseObj.token);
    }

    setJWTTokenInCookie (responseObj: any): void {
        document.cookie = 'jwt-token=' + responseObj.token + ';expires=' + moment(new Date()).add(1, 'minutes').toDate();
    }

    isLoggedIn(): boolean {
        let isLoggedIn = false;
        if(moment(new Date()).isBefore(this.tokenExpiryTime)) {
           isLoggedIn = true; 
        }
        return isLoggedIn;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    logout(): void {
        localStorage.removeItem('jwt-token');
    }

}
