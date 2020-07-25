import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerSuccess:boolean = false;
  public validateRecaptcha:boolean = true;
    
  constructor(private _userService:UserServiceService,private router: Router) { }

  myUserDetails = new FormGroup({
    emailAddress: new FormControl(null,[
      Validators.required,
      Validators.email
    ]),
    username: new FormControl(null,[
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
      Validators.minLength(5),
      Validators.maxLength(15)]),
    password: new FormControl(null,[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24),
      upperCaseValidator,
      lowerCaseValidator,
      numberValidator]),
    repassword: new FormControl(null,[
      Validators.required]),
    birthdate: new FormControl('2000-01-01',[
      Validators.required]),  
    userterms:new FormControl(true,[
      Validators.requiredTrue
    ])},{validators:matchPassword}); 

  ngOnInit(): void {
    
  }

  resolved(captchaResponse:string) {
    this._userService.validateReCaptcha(captchaResponse).subscribe(res => {
      res['success'] == true ? this.validateRecaptcha=false : this.validateRecaptcha=true;})
   
  }

  ngOnSubmit():void {
    this._userService.setUser(this.myUserDetails);
    
    this.registerSuccess=true;
    setTimeout(() => { this.registerSuccess=false;
      this._userService.sendVerificationEmail(this.myUserDetails.get('emailAddress').value);                
      this.router.navigateByUrl('/login');

    }, 5000);
  }

}
// İs value include an uppercase ?
function upperCaseValidator(control: AbstractControl):{[key: string]: boolean} | null {
  const isUppercase = /[A-Z]/.test(control.value);

  if(!isUppercase){
    return {'upperCaseValidator': true}
  }
  return null;
}
// İs value include an lowercase ?
function lowerCaseValidator(control: AbstractControl):{[key: string]: boolean} | null {
  const isLowercase = /[a-z]/.test(control.value);
  if(!isLowercase){
    return {'lowerCaseValidator': true}
  }
  return null;
}

//  İs value include an lowercase ? 
function numberValidator(control: AbstractControl):{[key: string]: boolean} | null {
  const isNumberinclude = /[0-9]/.test(control.value);
  if(!isNumberinclude){
    return {'numberValidator': true}
  }
  return null;
}

//İs password and rePassword match ?
function matchPassword(control: AbstractControl) {
  let password = control.get('password').value;
  let confirmPassword = control.get('repassword').value;

  if (password != confirmPassword) {
    return { ConfirmPassword: true };
  } else {
      return null
  }
}


