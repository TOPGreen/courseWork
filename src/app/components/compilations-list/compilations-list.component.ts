import {Component, OnInit} from '@angular/core';
import {CompilationsService} from "../../services/compilations/compilations.service";
import {FilmDTO} from "../../interfaces/filmDTO";
import {CompilationDTO} from "../../interfaces/CompilationDTO";

@Component({
  selector: 'app-compilations-list',
  templateUrl: './compilations-list.component.html',
  styleUrls: ['./compilations-list.component.css']
})
export class CompilationsListComponent implements OnInit {

  get compilations(): CompilationDTO[] {
    return this.compilationsService.getCompilations;
  }

  get films(): FilmDTO[] {
    return this.compilationsService.getCurrentCompilationFilms;
  }

  constructor(private compilationsService: CompilationsService) {
  }

  ngOnInit(): void {
    this.compilationsService.getUserCompilations();
  }

  setCurrentCompilation(compilation: CompilationDTO) {
    this.compilationsService.setCurrentCompilation(compilation);
  }

  deleteCompilation(index:number){
    this.compilationsService.deleteCompilation(index);
  }

}
