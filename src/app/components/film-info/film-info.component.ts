import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../interfaces/film";
import {FilmsService} from "../../services/films/films.service";
import {WishlistService} from "../../services/wishlist/wishlist.service";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {

  @Input()
  film: Film;

  get currentFilm() {
    return this.filmsService.getCurrentFilm;
  }

  constructor(private filmsService: FilmsService, private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
  }

  addToWishList() {
    this.wishlistService.addFilm(Object.assign({},this.currentFilm));
  }

}
