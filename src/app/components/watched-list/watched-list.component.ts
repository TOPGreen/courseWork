import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {FilmDTO} from "../../interfaces/filmDTO";

@Component({
  selector: 'app-wached-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;

  constructor(private watchedListService: WatchedListService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'search': new FormControl('', []),
      'genre': new FormControl('Any', []),
      'runtime': new FormControl('Any', []),
    });

    this.watchedListService.getWatchedList();
  }

  ngOnDestroy(): void {
    this.watchedListService.setFilms([]);
  }

  get films(): FilmDTO[] {
    return this.watchedListService.getFilms;
  }
}


