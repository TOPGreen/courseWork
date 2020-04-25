import {Injectable} from '@angular/core';
import {OmdbService} from "../omdbApi/omdb.service";
import {Film} from "../../interfaces/film";
import {map, mergeAll, mergeMap} from "rxjs/operators";
import {combineLatest, from, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private films = [];
  private currentFilm: Film = {
    imdbID:"string",
    Title: "string",
    Poster: "string",
    Genre: "string",
    Year: "string",
    Director: "string",
    Actors: "string",
    Production: "string",
    Plot:"string",
    Ratings:[],
  };

  get getFilms() {
    return this.films;
  }

  get getCurrentFilm() {
    return this.currentFilm;
  }

  setCurrentFilm(film: Film) {
    this.currentFilm = film;
  }

  constructor(private omdbService: OmdbService) {
  }

  search(searchString: string) {
    this.setFilms([]);
    this.omdbService.search(searchString)
      .subscribe(data => {
        from(data['Search'])
          .pipe(
            mergeMap((film: any) => this.omdbService.getInfo(film.imdbID))
          ).subscribe(film => {
          this.addFilm(film)
        })
      })
  }

  setFilms(films) {
    this.films = films;
  }

  addFilm(film) {
    this.films.push(film);
  }

}
