import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FilmsService} from "../../services/films/films.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, delay, distinctUntilChanged, switchMap, takeUntil, tap} from "rxjs/operators";
import {FilmDTO} from "../../interfaces/filmDTO";
import {PageEvent} from "@angular/material/paginator";
import {NgAnimateScrollService} from 'ng-animate-scroll';

const searchControlName = "search"

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit, OnDestroy {
  private searchQuery$ = new BehaviorSubject<string>("");
  private onDestroy$ = new Subject();
  private scrollBtn = document.querySelector(".scroll-btn");

  public searchForm: FormGroup;
  public isLoading = false;
  public films$: Observable<FilmDTO[]>
  public pageIndex$ = new BehaviorSubject<number>(0);


  constructor(private filmsService: FilmsService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      [searchControlName]: new FormControl("", [])
    });

    this.searchForm.controls[searchControlName].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$),
      ).subscribe(value => {
      this.pageIndex$.next(this.filmsService.getLastSearchParam.page);
      this.filmsService.setLastSearchParam({search: "", page: 0})
      this.searchQuery$.next(value);
    });

    this.searchForm.controls[searchControlName].setValue(this.filmsService.getLastSearchParam.search);

    this.films$ = combineLatest(this.searchQuery$, this.pageIndex$)
      .pipe(
        delay(0),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(([searchQuery, pageIndex]: [string, number]) => this.searchFilm(searchQuery, pageIndex)),
        tap(() => {
          this.isLoading = false;
        })
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.filmsService.setLastSearchParam({search: this.searchQuery$.value, page: this.pageIndex$.value});
  }

  get searchControlName() {
    return searchControlName;
  }

  get filmsCount(): number {
    return this.filmsService.getFilmsCount;
  };

  get errorMessage(): string {
    return this.filmsService.getErrorMessage;
  }

  get searchValue(): string {
    return this.searchForm.get(searchControlName).value;
  }

  onPageChange({pageIndex}: PageEvent): void {
    this.pageIndex$.next(pageIndex);
  }

  searchFilm(searchString: string, pageIndex: number): Observable<any> {
    return this.filmsService.search(searchString, pageIndex + 1);
  }
}
