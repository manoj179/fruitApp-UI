import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private toastr: ToastrService,private userService:UserService,
    private router:Router){}
  loginForm: FormGroup;
  isSignUpStarted:boolean = false;

  ngOnInit(): void {
    if(sessionStorage.getItem("isLoggedIn")!=null && sessionStorage.getItem('userType')!=null){
      if(sessionStorage.getItem('userType').toLocaleLowerCase()=='admin'){
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
      userEmail: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(3)]]
    });
  }

  async login(){
    this.isSignUpStarted = true;
    console.log(this.loginForm.getRawValue());
    try{
      var res = await this.userService.loginUser(this.loginForm.value.userEmail,this.loginForm.value.password);
      if(res.status){
        sessionStorage.setItem("isLoggedIn",'true');
        sessionStorage.setItem("userData",JSON.stringify(res.data));
        sessionStorage.setItem('userType',res.data.userType);

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
