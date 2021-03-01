import { Injectable } from '@angular/core';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenService {

    constructor() {}

    /**
    * @memberof TokenService
    * Checks if authentication session cookie is present or not
    */
    getAuthenticationCookie(name: string): boolean {
        let cookieExists = false;
        if (document.cookie.indexOf(name) > -1) {
            cookieExists = true;
        }
        return cookieExists;
    }

    /**
    * @memberof TokenService
    * Deletes authentication cookie
    */
    deleteAuthenticationCookie(name: string): void {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    /**
    * @memberof TokenService
    * Checks if current user is authenticated to access resources of project
    */
    isLoggedIn(): boolean {
        let isLoggedIn = false;
        if (this.getAuthenticationCookie('connect.sid')) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        return isLoggedIn;
    }
}
