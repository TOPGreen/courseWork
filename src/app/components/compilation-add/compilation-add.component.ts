import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CompilationsService} from "../../services/compilations/compilations.service";

const titleControlName = "title";
const descriptionControlName = "description";

@Component({
  selector: 'app-compilation-add',
  templateUrl: './compilation-add.component.html',
  styleUrls: ['./compilation-add.component.css']
})
export class CompilationAddComponent implements OnInit {
  public compilationForm: FormGroup;

  @Output()
  close = new EventEmitter<void>();

  public errorMessage = "";

  constructor(private compilationsService: CompilationsService) {
  }

  ngOnInit(): void {
    this.compilationForm = new FormGroup({
      [titleControlName]: new FormControl('', [Validators.required]),
      [descriptionControlName]: new FormControl('', [Validators.required]),
    })
  }

  get titleControlName(): string {
    return titleControlName;
  }

  get descriptionControlName(): string {
    return descriptionControlName;
  }

  onSubmit(): void {
    if (this.compilationForm.valid) {
        this.compilationsService.addCompilation(Object.assign({films: []}, this.compilationForm.value));
        this.errorMessage = "";
    } else {
    this.errorMessage ="All field are required"
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
