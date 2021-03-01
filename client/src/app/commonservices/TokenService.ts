import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenService {

    constructor(private cookieService: CookieService) {}
    
    isLoggedIn(): boolean {
        let isLoggedIn = false;
        if(this.cookieService.check('connect.sid')) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        return isLoggedIn;
    }

}
