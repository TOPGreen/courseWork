import {Injectable} from '@angular/core';
import {Film} from "../../interfaces/film";
import {OmdbService} from "../omdbApi/omdb.service";
import {FirebaseService} from "../firebaseApi/firebase.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  private films: Film[] = [];
  private wishlistCollection = 'wishlist';
  private doc;

  get getFilms() {
    return this.films;
  }

  setFilms(films: Film[]) {
    this.films = films;
  }

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {

  }

  addFilm(film: Film) {
    if (!this.getFilms.some(el => el.imdbID === film.imdbID)) {
      this.films.push(film);
      this.firebaseService.addData(this.doc, this.wishlistCollection,
        {
          userId: this.authService.getUser.uid,
          films: this.films,
        });
    }
  }

  getWishList() {
    this.firebaseService.getUsersWishList(this.authService.getUser.uid).then((querySnapshot) => {
      this.doc = querySnapshot.docs[0];
      this.films = this.doc ? this.doc.data().films : [];
    })
  }

}
