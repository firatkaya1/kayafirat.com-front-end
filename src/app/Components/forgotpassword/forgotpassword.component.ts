import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styles: []
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private _userService:UserServiceService) { }

  public sendMailSuccess:boolean = false;
  public validateRecaptcha:boolean = true;

  myUserDetails = new FormGroup({
    emailAddress: new FormControl(null,[
      Validators.required,
      Validators.email
    ])}); 

  ngOnInit(): void {
  }

  ngOnSubmit(){
    this._userService.sendResetPasswordEmail(this.myUserDetails.controls['emailAddress'].value);
    this.sendMailSuccess=true;

    setTimeout(() => { this.sendMailSuccess=false;
      this.validateRecaptcha=true;
    
    }, 10000); 
  }

  resolved(captchaResponse:string) {
    this._userService.validateReCaptcha(captchaResponse).subscribe(res => {
      res['success'] == true ? this.validateRecaptcha=false : this.validateRecaptcha=true;})
   
  }


}
