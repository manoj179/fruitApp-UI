import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private toast:ToastrService,private userSerivce:UserService){}

  userList:User[];
  status:boolean;
  ngOnInit(): void {
    this.initUserFetch();
  }

  initUserFetch(){
    try{
      this.userSerivce.getuserList().then(res=>{
        if(res.status){
          this.userList = res.data;
        }
        else{
          this.toast.warning(res.message);
        }
      }).catch(err=>{
        console.log(err);
        this.toast.error('Failed to fetch data');
      });
    }
    catch(err){
      console.log(err);
    }
  }

  async updateStatus(id,item){

    try{
      let status = item.target.checked?'Active':'InActive';
      var res = await this.userSerivce.updateUserStatus(id,status);
      if(res.status){
        this.toast.success('Updated successfullt');
        this.initUserFetch();
      }
      else{
        this.toast.warning(res.message);
      }
    }
    catch(err){
      console.log(err);
      this.toast.error('Failed to fetch data');
    }
  }
}
