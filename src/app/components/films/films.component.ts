import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilmsService} from "../../services/films/films.service";
import {FormControl, FormGroup} from "@angular/forms";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  get films() {
    return this.filmsService.getFilms
  };

  data = {};
  searchForm: FormGroup;
  searchControl;

  constructor(private filmsService: FilmsService) {
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

  ngOnInit(): void {
  }

  async searchFilm(searchString: string) {
    this.filmsService.search(searchString);
  }
}
