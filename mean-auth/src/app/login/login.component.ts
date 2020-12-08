import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  username: string;
  password: string;

  
  constructor(private formBuidler: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) {
    this.form = this.formBuidler.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    const user = {
      username : this.form.get('username').value,
      password : this.form.get('password').value
    }

    this.authService.authenticateUser(user).subscribe(data => {
      var obj = JSON.parse(data);
      console.log(obj);
      if(obj.success) {
        this.authService.storeUserData(obj.token, obj.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show(obj.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
      }
    });
    
    this.form.reset({
      name: '',
      usernam: '',
      email: '',
      password: ''
    });
  }
}
