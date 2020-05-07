import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.doLogout()
      .then(() => this.router.navigate(['login']))
      .catch(err => console.log(err));
  }

}
