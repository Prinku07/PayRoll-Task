
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  Login: FormGroup;
  isLoading: boolean = false;

  constructor( private fb : FormBuilder, private router : Router) {}
    

  ngOnInit(): void {
    this.Login = this.fb.group({
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  Save(){
    this.router.navigate(['/mytask'])
    this.isLoading = true;
  }

}
