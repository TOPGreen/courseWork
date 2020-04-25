import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../interfaces/film";
import {FilmsService} from "../../services/films/films.service";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input()
  film: Film;

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
  }

  setCurrentFilm() {
    this.filmsService.setCurrentFilm(this.film);
  }

}
