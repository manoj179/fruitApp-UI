import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { Fruite } from 'src/app/models/fruit';
import { Orders } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { FruitService } from 'src/app/services/fruit.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-list-fruits',
  templateUrl: './list-fruits.component.html',
  styleUrls: ['./list-fruits.component.scss']
})
export class ListFruitsComponent implements OnInit {

  currentOrderIndex:number=0;
  fruiteList:Fruite[] = new Array<Fruite>();
  fruiteForm:FormGroup;
  orderQty:[];
  userDetails:User;
  constructor(private toast:ToastrService,private router:Router,private fruitService:FruitService,
    private fb:FormBuilder,private modalService: NgbModal,private cartService:CartService,
    private purchase:PurchaseService){}

  ngOnInit(): void {
    this.initializeForm();
    this.getFruitList();  
  }

  initializeForm(){
    this.fruiteForm = this.fb.group({
      fruits:this.fb.array([])
    });
    this.userDetails = <User>JSON.parse(sessionStorage.getItem('userData'));
  }

  getArrayValues(property,i){
    this.fruiteForm.get('').value
  }

  pushFruitToArray(fruit:Fruite){
    return this.fb.group({
      id: [fruit.id],
      name:[fruit.name],
      pricePerKG: [fruit.pricePerKG],
      availibility: [fruit.availibility],
      isActive: [fruit.isActive],
      lastModified:[fruit.lastModified],
      orderQty:[fruit.orderQty],
      imgUrl:[fruit.imgUrl]
    })
  }

  getFormArrayControl(){
    return (<FormArray>this.fruiteForm.get('fruits')).controls;
  }

  qtyChange(i){
    let available = parseFloat((<FormArray>this.fruiteForm.get('fruits')).controls[i].get('availibility').value); 
    let givenQty = parseFloat((<FormArray>this.fruiteForm.get('fruits')).controls[i].get('orderQty').value);

    if(givenQty>available){
      if(available >=1){
        (<FormArray>this.fruiteForm.get('fruits')).controls[i].get('orderQty').patchValue(1);
      }
      else{
        (<FormArray>this.fruiteForm.get('fruits')).controls[i].get('orderQty').patchValue(available)
      }
      this.toast.warning("Order qty cann't be greater than Instock qty");
    }
    else{
      if((givenQty%0.5)!=0){
        if(available >=1){
          (<FormArray>this.fruiteForm.get('fruits')).controls[i].get('orderQty').patchValue(1);
        }
        else{
          (<FormArray>this.fruiteForm.get('fruits')).controls[i].get('orderQty').patchValue(available)
        }
        this.toast.warning("Please enter qty in multiples of 0.5 (1/2 Kg)");
      }
    }
    
  }

  getFruitList() {
    this.fruitService.getFruitList().then(res => {
      if(res.status){
        this.fruiteList = <Array<Fruite>>res.data;
        this.fruiteList.forEach(m=>m.orderQty = 0);
        console.log(this.fruiteList)
        this.fruiteList.forEach(ele=> (<FormArray>this.fruiteForm.get('fruits')).push(this.pushFruitToArray(ele)));
        console.log(this.fruiteForm.getRawValue());
      }
      else{
        this.toast.warning(res.message);
      }
    }).catch(err=>{
      console.log(err);
      this.toast.error('something went wrong, plz try aftersome time');
    })
  }

  getFormArrayValues(property,i){
    if(i==0){
      i = this.currentOrderIndex;
    }
    return (<FormArray>this.fruiteForm.get('fruits')).controls[i].get(property).value
  }

  orderFruit(i,modalContent){
    this.currentOrderIndex = i;
    
    this.modalService.open(modalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				
			},
			(reason) => {
				
			},
		);
  }

  async placeOrder(){
    if(parseFloat((<FormArray>this.fruiteForm.get('fruits')).controls[this.currentOrderIndex].get('orderQty').value)==0){
      this.toast.warning('Plz add order qty');
      this.modalService.dismissAll();
      return;
    }
    let givenQty = parseFloat((<FormArray>this.fruiteForm.get('fruits')).controls[this.currentOrderIndex].get('orderQty').value);
    let price  = parseFloat((<FormArray>this.fruiteForm.get('fruits')).controls[this.currentOrderIndex].get('pricePerKG').value);
    let total = givenQty * price;
    
    let cartDetails = new Cart();

    cartDetails.id = 0;
    cartDetails.userId = this.userDetails.id;
    cartDetails.totalPrice = total;
    cartDetails.isInCart = true;
    cartDetails.createdOn = new Date().toISOString();
    cartDetails.updatedOn = new Date().toISOString();
    cartDetails.orders = new Array<Orders>();
    
    let order = new Orders();

    order.id = 0;
    order.fruiteId  =parseInt((<FormArray>this.fruiteForm.get('fruits')).controls[this.currentOrderIndex].get('id').value);
    order.quantity  = givenQty;
    order.pricePerKG = parseFloat((<FormArray>this.fruiteForm.get('fruits')).controls[this.currentOrderIndex].get('pricePerKG').value);

    cartDetails.orders.push(order);

    try{
      var res = await this.cartService.addItemToCart(cartDetails);
      if(res.status){
        var purchaseRes = await this.purchase.addItemToCart(res.data);
        if(res.status){
          this.toast.success('Order placed with total amount: rs '+total);
          // this.initializeForm();
          // this.getFruitList();
          // this.modalService.dismissAll();
          location.reload();
        }
        else{
          this.toast.warning(res.message);
        }
      }
      else{
        this.toast.warning(res.message);
      }
    }
    catch(err){

    }
    
  }

  navigateToManage(id){
    this.router.navigate(['/fruit/addUpdate'])
  }

  userIsAdmin(){
    return sessionStorage.getItem('userType').toLocaleLowerCase()=='admin'?true:false;
  }

  navigateToEdit(i){
    let id = parseInt((<FormArray>this.fruiteForm.get('fruits')).controls[this.currentOrderIndex].get('id').value);

    this.router.navigate(['/fruit/addUpdate/'+id]);
  }
}


