import {Injectable} from '@angular/core';
import {FilmDTO} from "../../interfaces/filmDTO";
import {FirebaseService} from "../firebaseApi/firebase.service";
import {AuthService} from "../auth/auth.service";
import {WishlistService} from "../wishlist/wishlist.service";

@Injectable({
  providedIn: 'root'
})
export class WatchedListService {

  private films: FilmDTO[] = [];
  private watchedListCollection = 'watchedList';
  private doc;

  get getFilms(): FilmDTO[] {
    return this.films;
  }

  setFilms(films: FilmDTO[]): void {
    this.films = films;
  }

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
    this.getWatchedList();
  }

  addFilm(film: FilmDTO): void {
    if (this.getFilms.some(el => el.imdbID === film.imdbID)) {
      alert("The film has already been added to the watchedList");
      return;
    }

    this.films.push(film);
    this.firebaseService.addData(this.watchedListCollection,
      {
        userId: this.authService.getUser.uid,
        films: this.films,
      }, this.doc);

  }

  deleteFilm(film: FilmDTO): void {
    const index = this.films.findIndex(el => el.imdbID === film.imdbID)
    this.films.splice(index, 1);
    this.firebaseService.addData(this.watchedListCollection, {
      userId: this.authService.getUser.uid,
      films: this.films
    }, this.doc)
  }


  getWatchedList(): void {
    this.firebaseService.getUsersList(this.watchedListCollection, this.authService.getUser.uid).then((querySnapshot) => {
      this.doc = querySnapshot.docs[0];
      this.films = this.doc ? this.doc.data().films : [];
    })
  }
}
