import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {FilmsComponent} from "./components/films/films.component";
import {AuthGuard} from "./guards/auth.guard";
import {WishlistComponent} from "./components/wishlist/wishlist.component";
import {WachedListComponent} from "./components/wached-list/wached-list.component";


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent,},
  {path: 'registration', component: RegistrationComponent,},
  {path: 'films', component: FilmsComponent, canActivate: [AuthGuard]},
  {path: 'wish', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'watched', component: WachedListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
