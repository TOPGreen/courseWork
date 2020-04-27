import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilmsService} from "../../services/films/films.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {FilmDTO} from "../../interfaces/filmDTO";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  data = {};
  searchForm: FormGroup;
  films: Observable<FilmDTO[]>
  errorMessage: string;
  pageEvent: PageEvent;

  get filmsCount() {
    return this.filmsService.getFilmsCount;
  };

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {

    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.searchForm = new FormGroup({
      'search': new FormControl(null, [])
    });

    this.searchForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(
        value => {
          this.pageEvent.pageIndex = 0;
          this.searchFilm(value)
          this.errorMessage = "";
        }
      )

  }

  onPageChange(event: PageEvent) {
    this.pageEvent = event;
    this.searchFilm(this.searchForm.controls['search'].value);
  }

  searchFilm(searchString: string): void {
    this.films = this.filmsService.search(searchString, this.pageEvent.pageIndex + 1);
    console.log(this.films)
  }

}
