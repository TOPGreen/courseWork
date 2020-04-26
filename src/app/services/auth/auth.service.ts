import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {UserDTO} from "../../interfaces/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  private user: UserDTO;

  private isAuth: boolean = false;

  get getUser(): UserDTO {
    return this.user;
  };

  get authStatus(): boolean {
    return this.isAuth;
  }

  doRegister(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.user = res.user;
          this.isAuth = true;
          resolve(res);
        }, err => reject(err));
    })
  }

  doLogin(value): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.user = res.user;
          this.isAuth = true
          resolve(res);
        }, err => reject(err));
    })
  }

  doLogout(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signOut()
        .then(res => {
          resolve(res);
          this.isAuth = false;
          this.user = null;
        }, err => reject(err));
    })
  }
}
