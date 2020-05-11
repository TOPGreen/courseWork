import {Injectable} from '@angular/core';
import {OmdbService} from "../omdbApi/omdb.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {filter, map, switchMap, tap} from "rxjs/operators";
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

  private lastSearchParam = {search: "", page: 0};
  private filmsCount = 0;
  private errorMessage = "";

  constructor(private omdbService: OmdbService) {
  }

  get getFilmsCount(): number {
    return this.filmsCount;
  }

  get getLastSearchParam(): { search: string, page: number } {
    return this.lastSearchParam;
  }

  setLastSearchParam(searchParam: { search: string, page: number }): void {
    this.lastSearchParam.search = searchParam.search;
    this.lastSearchParam.page = searchParam.page;
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

  get getErrorMessage(): string {
    return this.errorMessage;
  }

  setErrorMessage(error: string): void {
    this.errorMessage = error;
  }

  search(searchString: string, page: number): Observable<FilmDTO[]> {
    this.errorMessage = '';
    return this.omdbService.search(searchString, page)
      .pipe(
        map(data => {
          this.setErrorMessage(data["Error"]);
          this.setFilmsCount(+data["totalResults"]);
          return data["Search"];
        }),
        filter(films => films && films.length),
        switchMap((films: FilmDTO[]) =>  { return  combineLatest(films.map(film => {
          return this.omdbService.getInfo(film.imdbID)
        }))})
      )
  }

}
