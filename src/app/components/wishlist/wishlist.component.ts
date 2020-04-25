import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WishlistService} from "../../services/wishlist/wishlist.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  searchForm: FormGroup;

  get films() {
    return this.wishlistService.getFilms;
  }

  constructor(private wishlistService: WishlistService) {
    this.searchForm = new FormGroup({
      'search': new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    console.log("init");
    this.wishlistService.getWishList();
  }

}
