import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticateService }                                  from './../Service/AuthenticateService/authenticate.service';
import { Observable, throwError }                               from 'rxjs';
import { Injectable }                                           from '@angular/core';
import { catchError }                                           from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                
                this.authenticationService.logout();
                location.reload(true);
            } 
            if(err.status === 409) {
                return throwError(err.error.errorCode);
            }
            const error =  err.status || err.error.message || err.statusText ;            
            return throwError(error);
        }))
    }
}