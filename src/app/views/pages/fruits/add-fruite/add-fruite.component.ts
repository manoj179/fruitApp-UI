import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fruite } from 'src/app/models/fruit';
import { FruitService } from 'src/app/services/fruit.service';

@Component({
  selector: 'app-add-fruite',
  templateUrl: './add-fruite.component.html',
  styleUrls: ['./add-fruite.component.scss']
})
export class AddFruiteComponent implements OnInit {

  constructor(private toast:ToastrService,private fruitService:FruitService,
    private fb:FormBuilder,private route: ActivatedRoute,private router:Router){}

  imageFile: File;
  curImgUrl:any;
  fruitForm:FormGroup;
  fruitId: number = 0;
  fruitModel:Fruite= new Fruite();
  async ngOnInit() {
    this.initializeForm();
    if(this.route.snapshot.paramMap.get('id')!=undefined && parseInt(this.route.snapshot.paramMap.get('id'))!=null){
       this.fruitId = parseInt(this.route.snapshot.paramMap.get('id'));
       await this.getFruitDetails();
    }
    
  }

  initializeForm(){
    this.fruitForm = this.fb.group({
      id: [this.fruitId],
      name: ['',Validators.required],
      pricePerKG: [0,[Validators.required,Validators.maxLength(3)]],
      availibility: [0,[Validators.required,Validators.maxLength(3)]],
      lastModified:[null],
      isActive: [true]
    });
  }

  async getFruitDetails(){
    try{
      let res = await this.fruitService.getFruitById(this.fruitId);
      if(res.status){
        this.fruitForm.patchValue(res.data);
      }
      else{
        this.toast.warning(res.message);
      }
    }
    catch(err){
      console.log(err);
      this.toast.error('Something went wrong please after sometime');
    }
  }

  renderSelImg(event) {

    if (event.target.files && event.target.files[0]) {
      const file = <File>event.target.files[0];
      if (file.size > 1048576) {
        this.toast.warning('Image size is more than 1MB cannot upload');
        return;
      }
      else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          var arrayBuffer = e.target.result.toString().split('base64,')[1]
          this.curImgUrl = e.target.result;
        };

        reader.readAsDataURL(file);
      }

      this.imageFile = file;

    }
  }

  async adOrUpdateFruit(){
    try{
      if(this.fruitId==0){
        var formData = new FormData();

        formData.append("id",'0');
        formData.append("name",this.fruitForm.value.name);
        formData.append("pricePerKG",this.fruitForm.value.pricePerKG);
        formData.append("availibility",this.fruitForm.value.availibility);
        formData.append("isActive",'true');
        formData.append("lastModified",new Date().toISOString());
        formData.append("ImgFile",this.imageFile);

        let res = await this.fruitService.addFruit(formData);
        if(res.status){
          this.toast.success('Fruit Addedd Successfully');
          this.router.navigate(['/fruit/list']);
        }
        else{
          this.toast.warning(res.message);
        }
      }
      else{
        let res = await this.fruitService.updateFruit(this.fruitForm.getRawValue());
        if(res.status){
          this.toast.success('Fruit Addedd Successfully');
          this.router.navigate(['/fruit/list']);
        }
        else{
          this.toast.warning(res.message);
        }
      }
    }
    catch(err){
      console.log(err);
      this.toast.error('Something went wrong please after sometime');
    }
    
  }
}
