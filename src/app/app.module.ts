import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {FilmsComponent} from './components/films/films.component';
import {AuthGuard} from "./guards/auth.guard";
import { FilmCardComponent } from './components/film-card/film-card.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from '@angular/material/sidenav';
import { FilmInfoComponent } from './components/film-info/film-info.component';
import {MatRippleModule} from '@angular/material/core';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WatchedListComponent } from './components/watched-list/watched-list.component';
import { MainComponent } from './components/main/main.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FilmsSearchPipe } from './pipes/films-search.pipe';
import { CompilationsListComponent } from './components/compilations-list/compilations-list.component';
import { CompilationCardComponent } from './components/compilation-card/compilation-card.component';
import { CompilationAddComponent } from './components/compilation-add/compilation-add.component';
import {MatExpansionModule} from '@angular/material/expansion';

const MAT_MODULES = [
  MatToolbarModule,
  MatButtonToggleModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatSidenavModule,
  MatRippleModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    FilmsComponent,
    FilmCardComponent,
    FilmInfoComponent,
    WishlistComponent,
    WatchedListComponent,
    MainComponent,
    FilmsSearchPipe,
    CompilationsListComponent,
    CompilationCardComponent,
    CompilationAddComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ...MAT_MODULES,
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
