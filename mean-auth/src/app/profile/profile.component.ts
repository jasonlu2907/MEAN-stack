import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(profile => {
      // console.log("hello cc", profile);
      // 
      this.user = profile.user;
      // console.log("bug:", this.user);
    }, err => {
      console.log(err);
      return false;
    });
  }

}

interface User {
  name?: string,
  username: string,
  password: string,
  email: string
}
