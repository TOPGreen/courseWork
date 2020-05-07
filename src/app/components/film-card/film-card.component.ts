import {Component, Input, OnInit} from '@angular/core';
import {FilmDTO} from "../../interfaces/filmDTO";
import {FilmsService} from "../../services/films/films.service";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {
  @Input()
  film: FilmDTO;

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    if (this.film.Poster === "N/A") {
      this.film.Poster="https://clotilda.ru/sites/default/files/styles/900x1200/public/default_images/no-image.jpg?itok=x1wQrkTb"
    }
  }

  setCurrentFilm(): void {
    this.filmsService.setCurrentFilm(this.film);
  }

}
