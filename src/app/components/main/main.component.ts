import {Component, OnDestroy, OnInit} from '@angular/core';
import {WishlistService} from "../../services/wishlist/wishlist.service";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {CompilationsService} from "../../services/compilations/compilations.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private wishlistService: WishlistService,
              private watchedListService: WatchedListService,
              private compilationsService: CompilationsService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.wishlistService.setFilms([]);
    this.watchedListService.setFilms([]);
    this.compilationsService.setCompilations([]);
  }

}
