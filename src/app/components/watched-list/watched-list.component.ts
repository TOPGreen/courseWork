import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {FilmDTO} from "../../interfaces/filmDTO";

@Component({
  selector: 'app-wached-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit {

  searchForm: FormGroup;

  get films(): FilmDTO[] {
    return this.watchedListService.getFilms;
  }

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
}


