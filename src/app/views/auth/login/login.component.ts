import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { SessionMgmtService } from 'src/app/services/session-mgmt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private toastr: ToastrService,private userService:UserService,
    private router:Router,private sessionService:SessionMgmtService){}
  loginForm: FormGroup;
  isSignUpStarted:boolean = false;

  ngOnInit(): void {
    if(sessionStorage.getItem("isLoggedIn")!=null && this.sessionService.getUserData()!=null){
      if(this.sessionService.getUserData().userType.toLocaleLowerCase()=='admin'){
        this.router.navigate(['/fruit/list']);
      }
      else{
        this.router.navigate(['/fruit/list']);
      }
    }
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      emailAddress: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(3)]]
    });
  }

  async login(){
    this.isSignUpStarted = true;
    console.log(this.loginForm.getRawValue());
    try{
      var res = await this.userService.loginUser(this.loginForm.getRawValue());
      if(res.status){
        sessionStorage.setItem("isLoggedIn",'true');

        this.sessionService.setUserData(res.data);
        this.sessionService.setToken(res.token);
        this.sessionService.setRefreshToken(res.refreshToken);
        
        if((<User>res.data).userType.toLocaleLowerCase()=='admin'){
          this.router.navigate(['/fruit/list']);
        }
        else{
          this.router.navigate(['/fruit/list']);
        }
      }
      else{
        this.toastr.warning(res.message);
      }
    }
    catch(err){
      console.log(err);
    }
    this.isSignUpStarted = false;
  }

}
