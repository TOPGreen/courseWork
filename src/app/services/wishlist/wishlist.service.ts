import {Injectable} from '@angular/core';
import {FilmDTO} from "../../interfaces/filmDTO";
import {OmdbService} from "../omdbApi/omdb.service";
import {FirebaseService} from "../firebaseApi/firebase.service";
import {AuthService} from "../auth/auth.service";
import {WatchedListService} from "../wathedList/watched-list.service";

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  private films: FilmDTO[] = [];
  private wishlistCollection: string = 'wishlist';
  private doc: any;

  get getFilms(): FilmDTO[] {
    return this.films;
  }

  setFilms(films: FilmDTO[]): void {
    this.films = films;
  }

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.getWishList();
  }

  addFilm(film: FilmDTO): void {
    if (this.getFilms.some(el => el.imdbID === film.imdbID)) {
      alert("The film has already been added to the watchedList");
      return;
    }

    this.films.push(film);
    this.firebaseService.updateData(this.wishlistCollection,
      {
        userId: this.authService.getUser.uid,
        films: this.films,
      }, this.doc);

  }

  deleteFilm(film: FilmDTO): void {
    const index = this.films.findIndex(el => el.imdbID === film.imdbID)
    this.films.splice(index, 1);
    this.firebaseService.updateData(this.wishlistCollection, {
      userId: this.authService.getUser.uid,
      films: this.films
    }, this.doc)
  }

  getWishList(): void {
    this.firebaseService.getUsersList(this.wishlistCollection, this.authService.getUser.uid).then((querySnapshot) => {
      this.doc = querySnapshot.docs[0];
      this.films = this.doc ? this.doc.data().films : [];
    })
  }

}
