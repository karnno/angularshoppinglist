import {Directive, HostBinding, HostListener} from '@angular/core' ;

@Directive ({
        selector: '[appDropdown] '
})
export class DropdownDirective {

        // we attach to the CSS class 'open' 
        @HostBinding('class.open') isOpen = false;

        


        @HostListener('click') onClick(event: Event){

                this.isOpen = !this.isOpen;
                  
                
        }


}
/*
If you want that a dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one (placing the listener not on the dropdown, but on the document):

import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

*/