import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
// import {UserDTO} from "../../interfaces/UserDTO";
// import * as firebase from "firebase";
import {auth, User} from "firebase";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState$: Observable<User>;

  constructor(public afAuth: AngularFireAuth) {
    this.authState$ = afAuth.authState;
    this.changeAuthState();
  }

  private user: User

  get getUser(): User {
    return this.user;
  };

  get authStatus(): boolean {
    return this.user !== null;
  }

  changeAuthState(){
    this.authState$.pipe(take(1)).subscribe(user => this.user = user)
  }

  async doRegister(value): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.changeAuthState();
        return res;
      })
  }

  async doLogin(value): Promise<any> {
    return auth().setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() =>
        this.afAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            this.changeAuthState();
            return res
          })
      )

  }

  async doLogout(): Promise<any> {
    return this.afAuth.signOut().then((res) => {
      this.changeAuthState();
      return res;
    }).catch(err => err);
  }

}
