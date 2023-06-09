import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Purchase } from 'src/app/models/purchase';
import { User } from 'src/app/models/user';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private toast:ToastrService,private purchaseService:PurchaseService,
    private modalService:NgbModal,private route: ActivatedRoute,private fb:FormBuilder){}
  
  purchaseForm:FormGroup;
  editingId:number = 0;
  currentUser:User = <User>JSON.parse(sessionStorage.getItem("userData"));
  purchaseList:Purchase[] = new Array<Purchase>();
  userId:number = parseInt(this.route.snapshot.paramMap.get('id'));
  ngOnInit(): void {
    this.initListFect();
    
  }

  initListFect(){
    try{
      this.purchaseService.getOrderByUserId(this.userId).then(res=>{
        if(res.status){
          this.purchaseList = res.data;
          console.log(this.purchaseList);
          console.log(this.purchaseList[0].orders[0].fruite.name);
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

  openPopUp(modalContent,item){
    if(item.statusReason!=null){
      this.toast.warning('Cannot update to this order');
      return;
    }
    this.editingId = item.id;

    this.modalService.open(modalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				
			},
			(reason) => {
				
			},
		);
    this.purchaseForm = this.fb.group({
      id:[this.editingId],
      status: ['',Validators.required],
    })
  }

  async updateStatus(){
    let postingData = this.purchaseForm.getRawValue();

    try{
      var res = await this.purchaseService.updatePurchaseStatus(postingData);
      if(res.status){
        this.toast.success('Status updated successfully');
        this.initListFect();
        this.modalService.dismissAll();
      }
      else{
        this.toast.warning(res.message);
      }
    }
    catch(err){
      console.log('Failed to update status');
    }
  }
}
