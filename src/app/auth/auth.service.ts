import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface AuthResponseData {
idToken	        :string;	//A Firebase Auth ID token for the newly created user.
email	        :string;	//The email for the newly created user.
refreshToken	:string;	//A Firebase Auth refresh token for the newly created user.
expiresIn	    :string;    //The number of seconds in which the ID token expires.
localId	        :string;    //The uid of the newly created user.
registered?     : boolean;  // when signing in with email-password, this boolean says whether the email is for an existing account
}

interface AuthSigninWithOAuthCredentialsData {
requestUri	        :string;    //The URI to which the IDP redirects the user back.
postBody	        :string;    //Contains the OAuth credential (an ID token or access token) and provider ID which issues the credential.
returnSecureToken	:boolean;   //Whether or not to return an ID and refresh token. Should always be true.
returnIdpCredential	:boolean;   //Whether to force the return of the OAuth credential on the following errors: FEDERATED_USER_ID_ALREADY_LINKED and EMAIL_EXISTS.
}


@Injectable({providedIn : "root"})
export class AuthService {

    user = new BehaviorSubject <User> (null);
    
    localStorageKey : string = 'userData';

    private tokenExpirationTimer : any;


    constructor(private httpclient :  HttpClient, private router : Router){

    }

    signup(email : string, password: string){        

        return this.httpclient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYhhnd7C-DnjlK5ierxJ-0KD7DjxJL-8U',
            {
                email : email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError (this.handleError),

            tap( responseData => {
                 this.handleAuthentication(
                    responseData.email, 
                    responseData.localId, 
                    responseData.idToken, 
                    +responseData.expiresIn); // using '+' converts into a number
            })
        )
        ;


    }

    login (email: string, password: string){

         
        return this.httpclient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYhhnd7C-DnjlK5ierxJ-0KD7DjxJL-8U',
            {
                email : email,
                password: password,
                returnSecureToken: true  // Whether or not to return an ID and refresh token. Should always be true.
            }

        )
        .pipe(
            catchError (this.handleError),

            tap( responseData => {
                 this.handleAuthentication(
                    responseData.email, 
                    responseData.localId, 
                    responseData.idToken, 
                    +responseData.expiresIn); // using '+' converts into a number
            })
        );

    }


    autoLogin(){
        const userData : {
            email: string, 
            id : string,
            _token : string, 
            _tokenExpirationDate : string
        }= JSON.parse(localStorage.getItem(this.localStorageKey));

        if (!userData){
            // no user login previously stored
            return;
        }

        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate));

        if (loadedUser.token){
            this.user.next(loadedUser);
            const expirationDurationInMillisecondsForLoadedUser =
                (new Date(userData._tokenExpirationDate)).getTime() - (new Date()).getTime() ;
            
            
            this.autoLogout(expirationDurationInMillisecondsForLoadedUser);

        }

    }



    logout(){
        this.user.next(null);
        this.router.navigate(['/auth' ]);
        localStorage.removeItem(this.localStorageKey);

        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration : number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout( ()=> {
            this.logout();
            },
            expirationDuration
        );
    }

    private handleAuthentication(
        email: string, 
        userId : string, 
        token: string, 
        expiresInSeconds: number){
        const responseDataExpirationDateInSeconds: number = expiresInSeconds * 1000; // using '+' converts into a number

        const expirationDate = new Date( 
            new Date().getTime() +   responseDataExpirationDateInSeconds
        );

        const userToReturn = new User(email, userId, token, expirationDate);

        this.user.next(userToReturn);
        // make sure the user never stays logged forever by starting the timer
        this.autoLogout(expiresInSeconds * 1000);

        // saving token info on browser
        // => f12, Application tab / storage / local storage
        localStorage.setItem(this.localStorageKey, JSON.stringify(userToReturn) );
    }

    private handleError (errorRes : HttpErrorResponse){
        let errorMessage = 'An unknown error occurred';

        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }

        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':   
                errorMessage = 'This email already exists';
                break;
             
            case 'EMAIL_NOT_FOUND':  
                errorMessage = 'This email does not exist';
                break;
            
            case 'INVALID_PASSWORD':  
                errorMessage = 'This password is invalid';
                break;
        }

        return throwError(errorMessage);
    }
}
