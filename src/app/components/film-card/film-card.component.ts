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
      this.film.Poster="https://www.imelt.com.tr/r/w-260_h-350/test/test-image-005.png";
    }
  }

  setCurrentFilm(): void {
    this.filmsService.setCurrentFilm(this.film);
  }

}
