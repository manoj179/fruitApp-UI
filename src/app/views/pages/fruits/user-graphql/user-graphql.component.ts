import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-graphql',
  templateUrl: './user-graphql.component.html',
  styleUrl: './user-graphql.component.scss'
})
export class UserGraphqlComponent implements OnInit {

  tableCols:any[];
  tableData:any[];
  userObj:User;
  selectedColsForQL:any[];
  constructor(private userService:UserService){
    this.userObj = new User();
    this.tableCols = new Array<any>();
    this.tableData = new Array<any>();
    this.selectedColsForQL = new Array<any>();
  }

  ngOnInit(): void {
    for(var key in this.userObj){
      this.tableCols.push({prop:key,isSelected:false});
    }
    console.log('cols: ',this.tableCols);
  }

  loadUserInfos(data=null){
    console.log('sending data: ',data);
    this.userService.getUsersByGraphQL(data).subscribe(res=>{
      console.log(res);
      this.tableData = res.data.usersList;
    });
  }

  getRefreshedCols():Array<any>{
    return this.tableCols.filter(m=>m.isSelected);
  }

  getDataBtnClicked(){
    let data = this.getRefreshedCols();
    if(data.length>0){
      this.loadUserInfos(data.map(m=>m.prop).join(' '));
    }
    else this.tableData = [];
  }
}
