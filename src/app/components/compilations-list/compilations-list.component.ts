import {Component, OnInit, ViewChild} from '@angular/core';
import {CompilationsService} from "../../services/compilations/compilations.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {CompilationDTO} from "../../interfaces/CompilationDTO";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-compilations-list',
  templateUrl: './compilations-list.component.html',
  styleUrls: ['./compilations-list.component.css']
})
export class CompilationsListComponent implements OnInit {

  @ViewChild("drawerRight",)
  drawerRight: MatSidenav;

  constructor(private compilationsService: CompilationsService) {
  }

  ngOnInit(): void {
    this.compilationsService.getUserCompilations();
  }

  get compilations(): CompilationDTO[] {
    return this.compilationsService.getCompilations;
  }

  get films(): FilmDTO[] {
    return this.compilationsService.getCurrentCompilationFilms;
  }

  setCurrentCompilation(index: number): void {
    this.compilationsService.setCurrentCompilation(index);
  }

  deleteCompilation(index: number): void {
    this.compilationsService.deleteCompilation(index);
  }
}
