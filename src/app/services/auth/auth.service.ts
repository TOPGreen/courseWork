import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  private user;

  private isAuth = false;

  get getUser() {
    return this.user;
  };

  get authStatus() {
    return this.isAuth;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.user = res.user;
          this.isAuth = true;
          resolve(res);
        }, err => reject(err));
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.user = res.user;
          this.isAuth = true
          resolve(res);
        }, err => reject(err));
    })
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signOut()
        .then(res => {
          resolve(res);
          this.isAuth = false;
        }, err => reject(err));
    })
  }


}
