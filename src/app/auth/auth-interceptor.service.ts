import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

/**
 * This interceptor should ADD the token to ALL the OUTGOING requests
 * 
 * NB :  don't forget to add 
 * { provide: HTTP_INTERCEPTORS, userClass : AuthInterceptorService , multi: true}
 * 
 * to the AppModule
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor (private authService : AuthService){}

    // with exhaustMap, we switch the observable with another observable that we enriched
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),

            exhaustMap (user => {
                if (!user){
                    // in the case we have not yet logged in
                    return next.handle(req);
                }
                const modifiedReq = req.clone ({
                     params: new HttpParams().set('auth', user.token)
                    });
                return next.handle(modifiedReq);

            })


        )

        ;
        // return next.handle(req);
    }
}
