import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilmsService} from "../../services/films/films.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {FilmDTO} from "../../interfaces/filmDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, AfterViewInit {

  data = {};
  searchForm: FormGroup;
  films$: Observable<FilmDTO[]>
  errorMessage: string;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  get filmsCount(): number {
    return this.filmsService.getFilmsCount;
  };

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    this.pageEvent = new PageEvent();
    this.searchForm = new FormGroup({
      'search': new FormControl("Harry Potter", [])
    });

    this.searchForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(
        value => {
          this.paginator.pageIndex = 0;
          this.searchFilm(value)
          this.errorMessage = "";
        }
      )
  }

  onPageChange(event: PageEvent): void {
    this.pageEvent = event;
    this.searchFilm(this.searchForm.controls['search'].value);
  }

  searchFilm(searchString: string): void {
    this.films$ = this.filmsService.search(searchString, this.paginator.pageIndex + 1)//this.pageEvent.pageIndex + 1);
  }

  ngAfterViewInit(): void {
    console.log("after")
    this.paginator.pageIndex = 0;
    this.searchFilm("Harry Potter");
  }

}
