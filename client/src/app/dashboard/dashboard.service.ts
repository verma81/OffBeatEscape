import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DashBoardService {
  
  postId = ''
  friendName = ''
  constructor(private http: HttpClient) { }

  /**
   * @memberof DashBoardService
   * API call to get friends posts
   */
    getFriendsPost(): Observable<any>{
      return this.http.get('http://localhost:3000/dashboard/generalFeed/').pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      )
    }

  /**
   * @memberof DashBoardService
   * API call to get saved posts
   */
    getSavedPosts(){
      return this.http.get('http://localhost:3000/post/posts/' + this.postId).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      )
    }

  /**
   * @memberof DashBoardService
   * API call to get users list
   */
    getUsersList(): Observable<any> {
        return this.http.get(`http://localhost:3000/users/usersList`).pipe(
            map((res: any) => {
            return res;
        }),
        catchError(this.handleError)
        );
    }

  /**
   * @memberof DashBoardService
   * API call to send friend request
   */
    sendFriendRequest(currentUser: any, sendFriendRequestPayLoad: any): Observable<any> {
        return this.http.post(`http://localhost:3000/users/sendFriendRequest/` + currentUser._id, sendFriendRequestPayLoad).pipe(
            map((res: any) => {
            return res;
        }),
        catchError(this.handleError)
        );
    }

  /**
   * @memberof DashBoardService
   * API call to get top trending posts
   */
    getTopTrendingPosts(): Observable<any> {
      return this.http.get(`http://localhost:3000/dashboard/trendingPosts`).pipe(
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
