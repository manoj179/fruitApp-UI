import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  constructor(private router:Router){}

  navigateToOrder(){
    let currentUser = <User>JSON.parse(sessionStorage.getItem("userData"));
    if((<User>JSON.parse(sessionStorage.getItem("userData"))).userType.toLocaleLowerCase()=="admin"){
      this.router.navigate(['/fruit/order-list/0']);
    }
    else{
      this.router.navigate([`/fruit/order-list/${currentUser.id}`]);
    }
  }

  logiOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  userIsAdmin(){
    return sessionStorage.getItem('userType').toLocaleLowerCase()=='admin'?true:false;
  }
}
