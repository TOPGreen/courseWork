import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebaseApi/firebase.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

const emailControlName = "email";
const passwordControlName = "password"
const confirmedPasswordControlName = "confirmedPassword"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public regForm: FormGroup;
  public errorMessage: string = '';

  constructor(private firebase: FirebaseService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      [emailControlName]: new FormControl(null, [Validators.required, Validators.email]),
      [passwordControlName]: new FormControl(null, [Validators.required]),
      [confirmedPasswordControlName]: new FormControl(null, [Validators.required])
    })
  }

  get emailControlName(): string {
    return emailControlName;
  }

  get passwordControlName(): string {
    return passwordControlName;
  }

  get confirmedPasswordControlName(): string {
    return confirmedPasswordControlName;
  }

  onSubmit(): void {
    if (this.regForm.valid && this.regForm.value.password === this.regForm.value.confirmedPassword) {
      this.tryRegister(this.regForm.value);
    } else {
      this.errorMessage = "Form is invalid";
    }
  }

  tryRegister(value): void {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = "";
        this.router.navigate(['films']);
      }, err => {
        this.errorMessage = err.message;
        console.log(err);
      })
  }
}
