
import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from 'src/app/core/Auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  Login: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Login = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  Save() {
    const controls = this.Login.controls;
    if (this.Login.invalid) {
      this.Login.markAllAsTouched();
      return;
    }
    const authData = {
      username: controls['mobile'].value,
      password: controls['password'].value
    };
    this.isLoading = true;
    this.authservice.login(authData.username, authData.password)
      .pipe(map((user: any) => {
        this.isLoading = false;
        if(user.success){
					let accessToken = 'Basic ' + btoa(authData.username + ':' + authData.password);
          const Token = 'abc.yy.zz';
          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['task']);
          this.authservice.currentuserSubject.next(user);
        }
        else
        this.toastr.error(user.errormessage)
      })
      ).subscribe();
  }
}
