import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WishlistService} from "../../services/wishlist/wishlist.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {WatchedListService} from "../../services/wathedList/watched-list.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  searchForm: FormGroup;

  get films(): FilmDTO[] {
    return this.wishlistService.getFilms;
  }

  constructor(private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'search': new FormControl(null, [])
    });

    this.wishlistService.getWishList();
  }

}
