import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {FilmsComponent} from "./components/films/films.component";
import {AuthGuard} from "./guards/auth.guard";
import {WishlistComponent} from "./components/wishlist/wishlist.component";
import {WatchedListComponent} from "./components/watched-list/watched-list.component";
import {MainComponent} from "./components/main/main.component";
import {CompilationsListComponent} from "./components/compilations-list/compilations-list.component";


const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'registration',
      component: RegistrationComponent,
    },
    {
      path: 'films',
      component: MainComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: FilmsComponent,
        },
        {
          path: 'wish',
          component: WishlistComponent,
        },
        {
          path: 'watched',
          component: WatchedListComponent,
        },
        {
          path: 'compilations',
          component: CompilationsListComponent,
        },
      ]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
