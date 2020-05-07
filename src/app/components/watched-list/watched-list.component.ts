import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {FilmDTO} from "../../interfaces/filmDTO";

const searchControlName = "search";
const genreControlName = "genre";
const runtimeControlName = "runtime";

@Component({
  selector: 'app-wached-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit {
  public searchForm: FormGroup;

  constructor(private watchedListService: WatchedListService) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      [searchControlName]: new FormControl('', []),
      [genreControlName]: new FormControl('Any', []),
      [runtimeControlName]: new FormControl('Any', []),
    });

    this.watchedListService.getWatchedList();
  }

  get searchControlName(){
    return searchControlName;
  }

  get genreControlName(){
    return genreControlName;
  }

  get runtimeControlName(){
    return runtimeControlName;
  }

  get films(): FilmDTO[] {
    return this.watchedListService.getFilms;
  }
}


