import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';

@NgModule({
  // all components directives etc.. you need to declare so you can use in your application
  declarations: [
    AppComponent,
    HeaderComponent
      
  ],
  // imports array enables to import other modules, like angular core modules.
  // careful : do NOT add modules that you lazy-load !
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  // lists the services availables by the modules
  // some services use the "@Injectable ({providedIn: 'root'})" annotation so we can avoid adding them here ( makes the appModule cleaner !)
  providers: [
    //LoggingService
  ],

  // the array is important to start the app, it defines which component is available in the index.html !
  bootstrap: [AppComponent],

  // older version of angular needs entry components. 
  // you add here the components that you create programatically 
  entryComponents: []
})
export class AppModule { }
