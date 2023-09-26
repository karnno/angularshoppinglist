import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


/**
 * more info here : https://angular.io/guide/dynamic-component-loader
 */
@Component(
    {
        selector: 'app-auth',
        templateUrl: './auth.component.html'
    }
)
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading  = false;
    error: string = null;

    private closeEmitterSubscription : Subscription;

    @ViewChild(PlaceholderDirective, { static: false }) alertHost : PlaceholderDirective;

    constructor(private authService : AuthService, private router : Router, private componentFactoryResolver : ComponentFactoryResolver){}


    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form : NgForm){

        if (!form.valid){
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs : Observable<AuthResponseData> ;


        this.isLoading = true;
        if (this.isLoginMode){

            authObs = this.authService.login(email, password);



        }else{
            
            authObs = this.authService.signup(email, password);
        }



        authObs.subscribe(
            respData => {
                console.log(respData);
                this.isLoading = false;

                this.router.navigate(['/recipes']);
            },
            errorMessage=> {
                console.log(errorMessage);

                //this.error = errorMessage;

                this.showErrorAlert(errorMessage);

                this.isLoading = false;
            }

        );
        
        form.reset();

    }

    onHandleError() {
        this.error = null;
    }

    /**
     * create the component to show message
     * 
     * we use an Angular factory and we select the html element (via the viewChild) when we tell the factory to create the component.
     * @param message 
     */
    private showErrorAlert(message : string){
        //const alertCmp = new AlertComponent() ; // this does not work the angular way !

        // this one knows how to create the alert component
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef; // in the constructor of PlaceholderDirective, we injected the PUBLIC container ref, so we can access it here. 

        hostViewContainerRef.clear(); // clear angular components that were displayed there before.

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory); // creating this variable enables us now to interact with it
        componentRef.instance.message = message;

        // since the alert component can emit an event via the 'close' field, we can subscribe and 'listen' to it
        this.closeEmitterSubscription = componentRef.instance.close.subscribe( () => {
            this.closeEmitterSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if (this.closeEmitterSubscription){ 
            this.closeEmitterSubscription.unsubscribe();
        }
    }
}