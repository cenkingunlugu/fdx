import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { PasswordValidator } from './validators/password.validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  userInfo: FormGroup;
  submissionSuccesful?: boolean;
  ngOnInit() {
    this.userInfo = new FormGroup({
      name: new FormControl('',[Validators.required]),
      surname: new FormControl('', [Validators.required, ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), PasswordValidator.noNameSurname, PasswordValidator.upperAndLower])
   });
  }
  onClickSubmit() {
    this.http.post('https://demo-api.now.sh/users', this.userInfo.value)
    .pipe(catchError((err) => {
      this.submissionSuccesful = false;
      return of(err);
    }))
    .subscribe(() => {
      this.submissionSuccesful = true;
    })
  }
}
