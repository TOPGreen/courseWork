import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilmsService} from "../../services/films/films.service";
import {FormControl, FormGroup} from "@angular/forms";
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {FilmDTO} from "../../interfaces/filmDTO";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  data = {};
  searchForm: FormGroup;
  searchControl;
  films: Observable<FilmDTO[]>

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'search': new FormControl(null, [])
    });

    this.searchControl = this.searchForm.controls['search'];
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(
        value => {
          this.searchFilm(value)
        }
      )
  }

  searchFilm(searchString: string): void {
    this.films = this.filmsService.search(searchString);
  }

}
