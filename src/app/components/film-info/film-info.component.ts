import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FilmDTO} from "../../interfaces/filmDTO";
import {FilmsService} from "../../services/films/films.service";
import {WishlistService} from "../../services/wishlist/wishlist.service";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {Router} from "@angular/router";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {

  @Input()
  film: FilmDTO;

  get currentFilm(): FilmDTO {
    return this.filmsService.getCurrentFilm;
  }

  get currentRoute() {
    return this.router.url;
  }

  constructor(private filmsService: FilmsService,
              private wishlistService: WishlistService,
              private watchedListService: WatchedListService,
              private router: Router) {
  }

  ngOnInit(): void {
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

}
