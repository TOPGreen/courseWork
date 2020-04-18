import {Injectable} from '@angular/core';
import {OmdbService} from "../omdbApi/omdb.service";

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
    this.omdbService.search(searchString).subscribe(data => {
      this.setFilms(data['Search'])
    })
  }

  setFilms(films) {
    this.films = films;
  }

}
