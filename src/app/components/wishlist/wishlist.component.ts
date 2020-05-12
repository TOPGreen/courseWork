import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WishlistService} from "../../services/wishlist/wishlist.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {genres} from 'src/app/consts/genres';
import {runtimeList} from "../../consts/runtimeList";

const searchControlName = "search";
const genreControlName = "genre";
const runtimeControlName = "runtime";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  public searchForm: FormGroup;

  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      [searchControlName]: new FormControl('', []),
      [genreControlName]: new FormControl('Any', []),
      [runtimeControlName]: new FormControl('Any', []),
    });

    this.wishlistService.getWishList();
  }

  get searchControlName() {
    return searchControlName;
  }

  get genreControlName() {
    return genreControlName;
  }

  get runtimeControlName() {
    return runtimeControlName;
  }

  get films(): FilmDTO[] {
    return this.wishlistService.getFilms;
  }

  get genres() {
    return genres.sort();
  }

  get runtimeList() {
    return runtimeList.sort();
  }
}
