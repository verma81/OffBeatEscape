import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostHeadingService {

  constructor(private http: HttpClient) { }

  /**
   * @memberof PostHeadingService
   * API call for getting post details
   */
  getPostDetails(postId: string): Observable<any> {
    return this.http.get('http://localhost:3000/post/posts/' + postId).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof PostHeadingService
   * API call for adding comment on a post
   */
  addCommentOnAPost(commentRequestData: any, postId: string): Observable<any> {
    return this.http.patch('http://localhost:3000/post/addComment/' + postId, commentRequestData).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof PostHeadingService
   * API call for reporting a post
   */
  reportPost(postId: String): Observable<any> {
    return this.http.patch('http://localhost:3000/post/reportPost/' + postId, postId).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

/**
 * @memberof PostHeadingService
 * API call for saving a post
 */
  savePost(postId: string, savedPostRequestPayload: { user: any; }) {
    return this.http.patch('http://localhost:3000/users/savePost/' + postId, savedPostRequestPayload).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof PostHeadingService
   * API call for deleting a post
   */
  delete(postId: String): Observable<any> {
    return this.http.delete("http://localhost:3000/post/posts/" + postId).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    )
  }

  /**
   * @memberof PostHeadingService
   * API call for saving post to a graph
   */
  savePostForGraph(postId: string, savedPostRequestPayload: { user: any; }) {
    return this.http.patch('http://localhost:3000/post/savepost/' + postId, savedPostRequestPayload).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof PostHeadingService
   * API call for getting inspirer history
   */
  getInspirerHistory(inspirerHistoryPayLoad: any): Observable<any> {
    return this.http.post('http://localhost:3000/post/inspirationCycle', inspirerHistoryPayLoad).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof PostHeadingService
   * error handler. In case XHR call fails
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
