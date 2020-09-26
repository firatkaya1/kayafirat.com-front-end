
import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CSRFInterceptor implements HttpInterceptor {
    
    constructor(private cc:CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {                
            const authReq = req.clone({
                headers: req.headers
                .set('X-XSRF-TOKEN', this.cc.get('XSRF-TOKEN')),withCredentials:true
            });
            return next.handle(authReq);
        
    }
}