import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb:FormBuilder,private toastr: ToastrService,private userService:UserService,
    private router:Router){}
  registerForm: FormGroup;
  isSignUpStarted:boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      id: [0],
      name:  ['',[Validators.required]],
      phone: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      userType: ['user'],
      password: ['',[Validators.required,Validators.min(3)]],
      isActive: [true],
      address: ['',[Validators.required,Validators.max(3)]],
      pincode: [50997]
    });
  }

  async register(){
    this.isSignUpStarted = true;
    console.log(this.registerForm.getRawValue());
    try{
      var res = await this.userService.register(this.registerForm.getRawValue());
      if(res.status){
        this.toastr.success('Registered Successfully');
        this.router.navigate(['/auth/login'])
      }
      else{
        this.toastr.warning(res.message);
      }
    }
    catch(err){
      console.log(err);
      this.toastr.error('Something went wrong');
    }
    
    this.isSignUpStarted = false;
  }
}
