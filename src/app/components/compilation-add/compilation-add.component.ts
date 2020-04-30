import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CompilationsService} from "../../services/compilations/compilations.service";

@Component({
  selector: 'app-compilation-add',
  templateUrl: './compilation-add.component.html',
  styleUrls: ['./compilation-add.component.css']
})
export class CompilationAddComponent implements OnInit {

  @Output()
  close = new EventEmitter<void>();

  compilationForm: FormGroup;

  constructor(private compilationsService: CompilationsService) {
  }

  ngOnInit(): void {
    this.compilationForm = new FormGroup({
      "title": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
    })
  }


  onSubmit(): void {
    if (this.compilationForm.valid) {
      this.compilationsService.addCompilation(Object.assign({films: []}, this.compilationForm.value));
    }
  }

  onClose(): void {
    this.close.emit();
  }

}
