import {Pipe, PipeTransform} from '@angular/core';
import {FilmDTO} from "../interfaces/filmDTO";
import {run} from "tslint/lib/runner";

@Pipe({
  name: 'filmsSearch',
  pure: false
})
export class FilmsSearchPipe implements PipeTransform {

  transform(films: FilmDTO[], searchString: string, genre: string, runtime: string, dateAdded: string, ...args: unknown[]): unknown {
    if (dateAdded === "Newer") {
      films.reverse();
    }
    return films.filter(film => {
      if (searchString && !film.Title.toLowerCase().includes(searchString.toLowerCase())) {
        return false
      }
      if (genre !== 'Any' && !film.Genre.toLowerCase().includes(genre.toLowerCase())) {
        return false;
      }
      if (runtime !== 'Any' && Number.parseInt(film.Runtime) >= Number.parseInt(runtime)) {
        return false
      }
      return true;
    });
  }
}
