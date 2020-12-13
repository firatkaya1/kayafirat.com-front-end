
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CookieService }                                        from 'ngx-cookie-service';
import { Injectable }                                           from '@angular/core';
import { Observable }                                           from 'rxjs';


@Injectable()
export class CSRFInterceptor implements HttpInterceptor {
    
    constructor(private cc:CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {                
            const authReq = req.clone({
                headers: req.headers
                .set('X-XSRF-TOKEN', this.cc.get('XSRF-TOKEN')),withCredentials:true
            });
            if(req.headers.has('ipAddress')){
                req = req.clone({
                    headers: req.headers.delete('X-XSRF-TOKEN').delete("ipAddress")
                });
                return next.handle(req);
            }
            return next.handle(authReq);
        
    }
}