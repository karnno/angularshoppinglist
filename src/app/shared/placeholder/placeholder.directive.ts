import { Directive, HostBinding, HostListener, ViewContainerRef } from "@angular/core";

@Directive ({
    selector: '[appPlaceholder] '
})
export class PlaceholderDirective {

/*
    // we attach to the CSS class 'open' 
    @HostBinding('class.open') isOpen = false;

        


    @HostListener('click') onClick(event: Event){

            this.isOpen = !this.isOpen;
              
            
    }
*/
    constructor(public viewContainerRef : ViewContainerRef){

    }


}