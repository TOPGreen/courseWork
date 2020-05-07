import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {UserDTO} from "../../interfaces/UserDTO";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user);
  }

  private user: firebase.User

  get getUser(): UserDTO {
    return this.user;
  };

  get authStatus(): boolean {
    return this.user !== null;
  }

  async doRegister(value): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        return res;
      })
      .catch(err => err);
  }

  async doLogin(value): Promise<any> {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        this.afAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            return res
          })
          .catch(err => err))
  }

  async doLogout(): Promise<any> {
    return this.afAuth.signOut();
  }

}
