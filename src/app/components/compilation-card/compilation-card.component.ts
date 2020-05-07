import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompilationDTO} from "../../interfaces/CompilationDTO";

@Component({
  selector: 'app-compilation-card',
  templateUrl: './compilation-card.component.html',
  styleUrls: ['./compilation-card.component.css']
})
export class CompilationCardComponent implements OnInit {
  @Input()
  compilation: CompilationDTO;

  @Output()
  onDelete = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteCompilation(event): void {
    event.stopPropagation();
    this.onDelete.emit()
  }

}
