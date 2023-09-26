import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [

    { path: '', component: ShoppingListComponent }

];
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule] 
})
export class ShoppingListRoutingModule{}