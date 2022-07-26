import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { PasswordValidator } from './validators/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  userInfo: UntypedFormGroup;

  submissionSuccesful?: boolean;

  ngOnInit() {
    this.userInfo = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      surname: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.noNameSurname,
        PasswordValidator.upperAndLower,
      ]),
    });
  }

  onClickSubmit() {
    if (this.userInfo.valid) {
      this.http.post('https://demo-api.now.sh/users', this.userInfo.value).subscribe({
        next: (res) => {
          console.log('success', res);
          this.submissionSuccesful = true;
        },
        error: (error) => {
          this.submissionSuccesful = false;
          console.log('error', error);
        },
      });
    }
  }
}
