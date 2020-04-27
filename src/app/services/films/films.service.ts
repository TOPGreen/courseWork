import {Injectable} from '@angular/core';
import {OmdbService} from "../omdbApi/omdb.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {map, switchMap} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  // private films: FilmDTO[] = [];
  private currentFilm: FilmDTO = {
    imdbID: "string",
    Title: "string",
    Poster: "string",
    Genre: "string",
    Year: "string",
    Director: "string",
    Actors: "string",
    Production: "string",
    Plot: "string",
    Ratings: [],
  };

  private filmsCount = -1;

  get getFilmsCount(): number {
    return this.filmsCount;
  }

  setFilmsCount(count: number): void {
    this.filmsCount = count;
  }

  // get getFilms(): FilmDTO[] {
  //   return this.films;
  // }

  get getCurrentFilm(): FilmDTO {
    return this.currentFilm;
  }

  setCurrentFilm(film: FilmDTO): void {
    this.currentFilm = film;
  }

  constructor(private omdbService: OmdbService) {
  }

  search(searchString: string, page: number): Observable<any> {
    return this.omdbService.search(searchString, page)
      .pipe(
        map(data => {
          this.setFilmsCount(+data["totalResults"])
          return data['Search']
        }),
        switchMap(films => combineLatest(films.map(film => this.omdbService.getInfo(film.imdbID))))
      )
  }

  // setFilms(films): void {
  //   this.films = films;
  // }
  //
  // addFilm(film): void {
  //   this.films.push(film);
  // }

}
