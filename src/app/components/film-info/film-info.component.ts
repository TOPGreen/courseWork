import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FilmDTO} from "../../interfaces/filmDTO";
import {FilmsService} from "../../services/films/films.service";
import {WishlistService} from "../../services/wishlist/wishlist.service";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {Router} from "@angular/router";
import {CompilationsService} from "../../services/compilations/compilations.service";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {
  @Input()
  film: FilmDTO;

  @Output()
  close = new EventEmitter<void>();

  constructor(private filmsService: FilmsService,
              private wishlistService: WishlistService,
              private watchedListService: WatchedListService,
              private router: Router,
              private compilationsService: CompilationsService) {
  }

  ngOnInit(): void {
  }

  get currentFilm(): FilmDTO {
    return this.filmsService.getCurrentFilm;
  }

  get currentRoute(): string {
    return this.router.url;
  }

  get compilationsList(): string[] {
    return this.compilationsService.getCompilationsList;
  }

  get currentCompilationTitle(): string {
    return this.compilationsService.getCurrentCompilationTitle;
  }

  onClose(): void {
    this.close.emit();
  }

  addToWishList(): void {
    this.wishlistService.addFilm(Object.assign({}, this.currentFilm));
  }

  addToWatchedList(): void {
    this.watchedListService.addFilm(Object.assign({}, this.currentFilm));
  }

  removeFromWishList(): void {
    this.wishlistService.deleteFilm(this.currentFilm);
  }

  removeFromWatchedList(): void {
    this.watchedListService.deleteFilm(this.currentFilm);
  }

  addToCompilation(compilation: string): void {
    this.compilationsService.addFilm(compilation, this.currentFilm);
  }

  removeFromCompilation(): void {
    this.compilationsService.deleteFilm(this.currentFilm);
  }

}
