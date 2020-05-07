import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable, pipe} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {Injectable} from "@angular/core";
import {map, take, tap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private afAuth: AngularFireAuth) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.afAuth.authState
      .pipe(
        take(1),
        map(authState => !!authState),
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['login']);
          }
        })
      );
  }
}
