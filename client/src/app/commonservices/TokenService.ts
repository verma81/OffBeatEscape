import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenService {

    constructor(private cookieService: CookieService) {}
    
    getCookie(name: string): boolean {
        let cookieExists = false;
        if(document.cookie.indexOf('connect.sid') >= -1) {
            cookieExists = true;
        }
        return cookieExists;
    }

    isLoggedIn(): boolean {
        let isLoggedIn = false;
        if(this.getCookie('connect.sid')) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        return isLoggedIn;
    }

}
