import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class MyHttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = JSON.stringify(localStorage.getItem('jwt-token'));
    // Clone the request and set the new header in one step.
    const authReq = req.clone({
        headers: req.headers.set('Authorization', jwtToken)
    });
    return next.handle(authReq);
  }
}
