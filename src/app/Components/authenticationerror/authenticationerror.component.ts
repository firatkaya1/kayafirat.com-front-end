import { ErrorService } from './../../Core/Service/ErrorService/error-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticationerror',
  templateUrl: './authenticationerror.component.html',
  styles: [
  ]
})
export class AuthenticationerrorComponent implements OnInit {

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
    this.errorService.addError(this.errorDetails,403,this.recaptcha).subscribe(data => {
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
