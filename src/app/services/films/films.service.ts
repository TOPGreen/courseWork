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

  get getFilms() {
    return this.films;
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
