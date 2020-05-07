import {Injectable} from '@angular/core';
import {OmdbService} from "../omdbApi/omdb.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {filter, map, switchMap} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private currentFilm: FilmDTO =
    {
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
      Runtime: "string"
    };

  private filmsCount = 0;

  constructor(private omdbService: OmdbService) {
  }

  get getFilmsCount(): number {
    return this.filmsCount;
  }

  setFilmsCount(count: number): void {
    this.filmsCount = count ? count : 0;
  }

  get getCurrentFilm(): FilmDTO {
    return this.currentFilm;
  }

  setCurrentFilm(film: FilmDTO): void {
    this.currentFilm = film;
  }

  search(searchString: string, page: number): Observable<FilmDTO[]> {
    return this.omdbService.search(searchString, page)
      .pipe(
        map(data => {
          this.setFilmsCount(+data["totalResults"]);
          return data['Search'];
        }),
        filter(films => films && films.length),
        switchMap((films: FilmDTO[]) => combineLatest(films.map(film => {
          return this.omdbService.getInfo(film.imdbID)
        })))
      )
  }

}
