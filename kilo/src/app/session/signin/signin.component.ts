import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user.service';
import { UserDto } from 'src/app/dashboard/models/dto/user.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.router.navigate(['/dashboard']);
  }

  googleSignIn() {
    this.authService.googleLogin().then(resp => {
      this.authService.setLocalData(
        resp.user.uid,
        resp.user.displayName,
        resp.user.email,
        resp.user.photoURL
      );

      let userDto = new UserDto(
        resp.user.displayName,
        resp.user.email,
        resp.user.photoURL
      );

      this.usersService.createUser(resp.user.uid, userDto).then(resp =>  {
        this.router.navigate(['/stories']);
      }).catch(error => {
        // TODO ha habido un error al insertar al usuario
      });
})

  }

}
