import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out', {cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['/login']);
  }
}
