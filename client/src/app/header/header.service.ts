import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

    constructor(private http: HttpClient) {}

   /**
   * @memberof HeaderService
   * API call to logout user and revoke his/her authentication token
   */
    logOutUser(): Observable<any> {
        return this.http.get(`http://localhost:3000/logout`).pipe(
            map((res: any) => {
            return res;
        }),
        catchError(this.handleError)
        );
    }

    /**
   * @memberof HeaderService
   * API call to accept friend request from another user
   */
    acceptFriendRequest(currentUserId: string, acceptFriendRequestPayLoad: any):Observable<any> {
        return this.http.post(`http://localhost:3000/users/acceptFriendRequest/` + currentUserId, acceptFriendRequestPayLoad).pipe(
            map((res: any) => {
            return res;
        }),
        catchError(this.handleError)
        );
    }

    /**
     * @memberof DashBoardService
     * Error handler for API calls
    */
     private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }

}