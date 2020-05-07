import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebaseApi/firebase.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

const emailControlName = "email";
const passwordControlName = "password"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';

  constructor(private firebase: FirebaseService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      [emailControlName]: new FormControl("test@test.ru", [Validators.required, Validators.email]),
      [passwordControlName]: new FormControl("test123", [Validators.required]),
    })
  }

  get emailControlName(): string {
    return emailControlName;
  }

  get passwordControlName(): string {
    return passwordControlName;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.tryLogin(this.loginForm.value);
    } else {
      this.errorMessage = "Некорректные данные";
    }
  }

  tryLogin(value): void {
    this.authService.doLogin(value)
      .then(res => {
        this.errorMessage = "";
        this.router.navigate(['films']);
      }, err => {
        this.errorMessage = err.message;
        console.log(err);
      })
  }
}
