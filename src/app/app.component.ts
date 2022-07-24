import { Component, OnInit } from '@angular/core';
import { FedexUser } from './models/fedex-user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from './validators/password.validator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userInfo: FormGroup;
  user: FedexUser = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };
  ngOnInit() {
    this.userInfo = new FormGroup({
      name: new FormControl(this.user.name,[Validators.required]),
      surname: new FormControl(this.user.surname, [Validators.required, ]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8), PasswordValidator.noNameSurname, PasswordValidator.upperAndLower])
   });
  }
}
