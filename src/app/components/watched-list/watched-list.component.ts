import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WatchedListService} from "../../services/wathedList/watched-list.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {genres} from "../../consts/genres";
import {runtimeList} from "../../consts/runtimeList";
import {NgAnimateScrollService} from "ng-animate-scroll";

const searchControlName = "search";
const genreControlName = "genre";
const runtimeControlName = "runtime";
const dateAddedControlName = "dateAdded";

@Component({
    selector: 'app-wached-list',
    templateUrl: './watched-list.component.html',
    styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit {
    public searchForm: FormGroup;

    constructor(private watchedListService: WatchedListService, private animateScrollService: NgAnimateScrollService) {
    }

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            [searchControlName]: new FormControl('', []),
            [genreControlName]: new FormControl('Any', []),
            [runtimeControlName]: new FormControl('Any', []),
            [dateAddedControlName]: new FormControl('Newer', []),
        });

        this.watchedListService.getWatchedList();
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
        return this.watchedListService.getFilms;
    }

    get genres() {
        return genres.sort();
    }

    get runtimeList() {
        return runtimeList.sort();
    }

    get dateAddedControlName(){
        return dateAddedControlName;
    }

    scrollToTop() {
        this.animateScrollService.scrollToElement('header', 750)
    }
}


