import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginform:FormGroup;
  isLoginError: boolean=false;
  submitted:boolean=false;

  constructor(private sharedService: SharedService,private LoginForm:FormBuilder,private loginService:LoginService,
    private sharedservice:SharedService,private router:Router,private toast:ToastrService) { }

 
ngOnInit(): void {
  this.createLoginform();

  
}

login(){
  this.loginService.sendPostRequest(this.loginform.value).subscribe((data: string)=>{
   
    sessionStorage.setItem("token", data)
    this.router.navigateByUrl('/dashboard');
  }, err => {
    this.toast.error('Invalid username/password')
  })  
  console.log(this.loginform.value)
}

createLoginform(){
  this.loginform = this.LoginForm.group({
    userName:['',[Validators.required]],
    password:['',[Validators.required]],
  })
}
get LoginFormControl() {
  return this.loginform.controls;
}
}
