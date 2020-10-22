import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable }                                           from '@angular/core';
import { Observable }                                           from 'rxjs';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       
        const skipIntercept = req.headers.has('skip');
        const photoIntercept = req.headers.has('photo');
         if(skipIntercept){
            req = req.clone({
                headers: req.headers.delete('skip')
            });
            return next.handle(req);
        }
        else if(photoIntercept) {
            req.headers.delete("Content-Type");
            req.headers.delete("photo")
            
            return next.handle(req);
        } else {  
            return next.handle(req);
        }
    }
}