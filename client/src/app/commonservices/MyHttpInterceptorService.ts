import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class MyHttpInterceptorService implements HttpInterceptor {

  /**
   * @memberof MyHttpInterceptorService
   * Used for intercepting API calls
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and set the new header in one step.
    const authReq = req.clone({
        withCredentials: true,
    });
    return next.handle(authReq);
  }
}
