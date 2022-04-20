import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable()
export class HttpEasyManagerInterceptor implements HttpInterceptor {
    constructor(
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("XD")
        return next.handle(req)        
    }
}
