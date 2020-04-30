import {FilmDTO} from "./filmDTO";

export interface CompilationDTO {
  title: string,
  description: string,
  films: FilmDTO[],
}
