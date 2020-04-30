import {Injectable} from '@angular/core';
import {CompilationDTO} from "../../interfaces/CompilationDTO";
import {FilmDTO} from "../../interfaces/filmDTO";
import {FirebaseService} from "../firebaseApi/firebase.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CompilationsService {

  private compilations: CompilationDTO[] = []
  private compilationsList: string[];
  private currentCompilation: CompilationDTO;
  private compilationsCollection: string = 'compilations';
  private doc;

  get getCompilations(): CompilationDTO[] {
    return this.compilations;
  }

  get getCompilationsList(): string[] {
    this.updateCompilationsList();
    return this.compilationsList;
  }

  get getCurrentCompilationFilms(): FilmDTO[] {
    return this.currentCompilation && this.currentCompilation.films ? this.currentCompilation.films : [];
  }

  setCurrentCompilation(compilation: CompilationDTO): void {
    this.currentCompilation = compilation;
  }

  constructor(private firebaseService: FirebaseService,
              private authService: AuthService) {
    this.getUserCompilations();
  }

  updateCompilationsList(): void {
    this.compilationsList = this.compilations.map(compilation => compilation.title);
  }

  addCompilation(compilation: CompilationDTO) {
    if (this.compilations.some(el => el.title === compilation.title)) {
      alert("The compilation has already been exist");
      return;
    }

    this.compilations.push(compilation);
    this.firebaseService.updateData(this.compilationsCollection,
      {
        userId: this.authService.getUser.uid,
        compilations: this.compilations,
      }, this.doc);
  }


  addFilm(compilation: string, film: FilmDTO) {
    this.compilations.forEach(el => {
      if (el.title === compilation) {
        if (el.films.some(el => el.imdbID === film.imdbID)) {
          alert("this film has already been added to this compilation")
          return;
        }
        el.films.push(film);
        this.firebaseService.updateData(this.compilationsCollection,
          {
            userId: this.authService.getUser.uid,
            compilations: this.compilations,
          }, this.doc);
      }
    })
  }

  deleteFilm(film: FilmDTO) {
    this.compilations.forEach(el => {
      if (el.title === this.currentCompilation.title) {
        const index = el.films.findIndex(filmEl => filmEl.imdbID === film.imdbID)
        el.films.splice(index, 1);
        this.firebaseService.updateData(this.compilationsCollection, {
          userId: this.authService.getUser.uid,
          compilations: this.compilations,
        }, this.doc);
        return;
      }
    })
  }

  getUserCompilations(): void {
    this.firebaseService.getUsersList(this.compilationsCollection,
      this.authService.getUser.uid).then((querySnapshot) => {
      this.doc = querySnapshot.docs[0];
      this.compilations = this.doc ? this.doc.data().compilations : [];
    })
  }

  deleteCompilation(index: number): void {
    this.compilations.splice(index, 1);
    this.firebaseService.updateData(this.compilationsCollection, {
      userId: this.authService.getUser.uid,
      compilations: this.compilations,
    }, this.doc);
  }

}
