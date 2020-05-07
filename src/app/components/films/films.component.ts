import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FilmsService} from "../../services/films/films.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from "rxjs/operators";
import {FilmDTO} from "../../interfaces/filmDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public films$: Observable<FilmDTO[]>

  private pageIndex$ = new BehaviorSubject<number>(0);
  private searchQuery$ = new BehaviorSubject<string>("");
  public isLoading = false;
  private onDestroy$ = new Subject();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'search': new FormControl(null, [])
    });

    this.searchForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      ).subscribe(value => {
      this.paginator.pageIndex = 0;
      this.pageIndex$.next(0);
      this.searchQuery$.next(value);
    });

    this.films$ = combineLatest(this.searchQuery$, this.pageIndex$)
      .pipe(
        tap(() => this.isLoading = true),
        switchMap(([searchQuery, pageIndex]: [string, number]) => this.searchFilm(searchQuery, pageIndex)),
        tap(() => this.isLoading = false),
      )
    ;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get filmsCount(): number {
    return this.filmsService.getFilmsCount;
  };

  onPageChange({pageIndex}: PageEvent): void {
    this.pageIndex$.next(pageIndex);
  }

  searchFilm(searchString: string, pageIndex: number): Observable<any> {
    return this.filmsService.search(searchString, pageIndex + 1);
  }


}
