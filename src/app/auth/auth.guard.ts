import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

/**
 * this class will protect the access to our project urls if the user is not logged in
 * ex: if you are not logged in, you can not type in the url bar : http://.../recipes or .../shopping-list/ ..
 */
@Injectable( {providedIn : 'root'} )
export class AuthGuard implements CanActivate {

    constructor(private authService : AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree| Observable<boolean | UrlTree> | Promise<boolean| UrlTree> {

            return this.authService.user. pipe(
                take(1), //very useful
                map (
                    user => {
                        //return !!user;

                        // NEWER SOLUTION
                        const isAuth = !!user;
                        if (isAuth){
                            return true;
                        }

                        return this.router.createUrlTree(['/auth']);
                    }
                )
                // OLD SOLUTION
                /*
                , tap ( booleanFromMapFunction => {
                    if (!booleanFromMapFunction) {
                        //if the above map function did not return true, we don't allow access
                        // we redirect to /auth

                        this.router.navigate(['/auth']);
                    }
                }
                )
                */
            );
        
    }
}