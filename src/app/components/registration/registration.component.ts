import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebaseApi/firebase.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  regForm: FormGroup;
  errorMessage = '';

  constructor(private firebase: FirebaseService, private authService: AuthService, private router: Router) {
    this.regForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmedPassword: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit() {
  }

  async onSubmit() {

    if (this.regForm.valid && this.regForm.value.password === this.regForm.value.confirmedPassword) {
      this.tryRegister(this.regForm.value);
    } else {
      this.errorMessage = "Некорректные данные";
    }

  }


  tryRegister(value) {
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
