import { AuthenticateService } from './../Service/AuthenticateService/authenticate.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthenticateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       
        if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1 ) {
            console.log("authentication çalışmak zorunda");
            let authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authenticationService.getLoggedInUserName()}`
                })
              
                 
            });
            return next.handle(authReq);
        } 
        else {
            return next.handle(req);
        }
    }
}