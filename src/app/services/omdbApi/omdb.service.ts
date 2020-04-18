import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = `http://www.omdbapi.com/?type=movie&apikey=c356589f`;

@Injectable({
  providedIn: 'root'
})

export class OmdbService {


  constructor(private httpClient: HttpClient) {
  }

  search(searchString: string): Observable<[]> {
    return this.httpClient.get<[]>(`${url}&s=${searchString.toLocaleLowerCase()}`);
  }

}
