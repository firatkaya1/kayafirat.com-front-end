import { ErrorService } from './../../Core/Service/ErrorService/error-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notfounderror',
  templateUrl: './notfounderror.component.html',
  styles: []
})
export class NotfounderrorComponent implements OnInit {

  public recaptcha:string = "";
  public sendSuccess:boolean = false;
  public sendFailed:boolean = true;

  constructor(private errorService:ErrorService) { }

  errorDetails = new FormGroup({
    emailAddress:new FormControl(null,[Validators.required,Validators.email]),
    message     :new FormControl(null,[Validators.required])}); 

  ngOnInit(): void {}

  resolved(responsecaptcha:string){
    this.recaptcha = responsecaptcha;
  }

  sendError(){
    this.errorService.addError(this.errorDetails,404,this.recaptcha).subscribe(data => {
      this.sendSuccess = true; 
      this.recaptcha = "";
      setTimeout(() => {
       this.sendSuccess = false; 
      }, 5000);
    },
    error => {
      this.sendFailed = false; 
      setTimeout(() => {
       this.sendFailed = true; 
      }, 5000);
    });
  }


}
