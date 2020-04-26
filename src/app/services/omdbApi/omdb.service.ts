import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {FilmDTO} from "../../interfaces/filmDTO";
import {OMDB_URL} from "../../consts/urls";

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private httpClient: HttpClient) {
  }

  search(searchString: string): Observable<FilmDTO[]> {
    return this.httpClient.get<FilmDTO[]>(`${OMDB_URL}&s=${searchString.toLocaleLowerCase()}`);
  }

  getInfo(id: string):Observable<FilmDTO> {
    return this.httpClient.get<FilmDTO>(`${OMDB_URL}&plot=full&i=${id}`);
  }

}
