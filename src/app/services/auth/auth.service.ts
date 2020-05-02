import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {UserDTO} from "../../interfaces/UserDTO";
import * as firebase from "firebase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user);
  }

  private _user: firebase.User;

  private user: firebase.User //UserDTO;

  private isAuth: boolean = false;

  get getUser(): UserDTO {
    return this.user;
  };

  get authStatus(): boolean {
    return this.user !== null;//this.isAuth;
  }

  async doRegister(value): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        // this.user = res.user;
        // this.isAuth = true;
        return res;
      })
      .catch(err => err);
  }

  async doLogin(value): Promise<any> {
    // return this.afAuth.signInWithEmailAndPassword(value.email, value.password)
    //   .then(res => {
    //     this.user = res.user;
    //     this.isAuth = true
    //     return res
    //   })
    //   .catch(err => err);
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        this.afAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            // this.user = res.user;
            // this.isAuth = true
            return res
          })
          .catch(err => err))
  }

  async doLogout(): Promise<any> {
    return this.afAuth.signOut()
      .then(res => {
        // this.isAuth = false;
        // this.user = null;
        return res;
      })
      .catch(err => err);
  }

}
