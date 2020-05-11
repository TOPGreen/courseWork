import {Component, Input, OnInit} from '@angular/core';
import {FilmDTO} from "../../interfaces/filmDTO";
import {FilmsService} from "../../services/films/films.service";

const NO_IMAGE = "assets/img/no-image.jpg"

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css'],
})
export class FilmCardComponent implements OnInit {
  @Input()
  film: FilmDTO;

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    if (this.film.Poster === "N/A") {
      this.film.Poster = NO_IMAGE;
    }
  }

  setCurrentFilm(): void {
    this.filmsService.setCurrentFilm(this.film);
  }

}
