import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WishlistService} from "../../services/wishlist/wishlist.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {genres} from 'src/app/consts/genres';
import {runtimeList} from "../../consts/runtimeList";
import {NgAnimateScrollService} from "ng-animate-scroll";

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

  constructor(private wishlistService: WishlistService,private animateScrollService: NgAnimateScrollService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      [searchControlName]: new FormControl('', []),
      [genreControlName]: new FormControl('Any', []),
      [runtimeControlName]: new FormControl('Any', []),
    });

    this.wishlistService.getWishList();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let button = window.document.querySelector(".scroll-btn");
    if (window.pageYOffset > 400) {
      button.classList.remove("invisible");
    } else if (!button.classList.contains("invisible")) {
      button.classList.add("invisible");
    }
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

  scrollToTop() {
    this.animateScrollService.scrollToElement('header', 750)
  }
}
