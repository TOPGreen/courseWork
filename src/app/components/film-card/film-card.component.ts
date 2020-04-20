import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../interfaces/film";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input()
  film;

  constructor() {
  }

  ngOnInit(): void {
  }

}
