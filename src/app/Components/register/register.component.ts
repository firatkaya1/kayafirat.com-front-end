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
  public errorCode:number;
    
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
      Validators.maxLength(36),
      upperCaseValidator,
      lowerCaseValidator,
      numberValidator]),
    birthdate: new FormControl('2000-01-01',[
      Validators.required]),  
    userterms:new FormControl(true,[
      Validators.requiredTrue
    ])}); 

  ngOnInit(): void {
    
  }

  resolved(captchaResponse:string) {
    this._userService.validateReCaptcha(captchaResponse).subscribe(res => {
      res['success'] == true ? this.validateRecaptcha=false : this.validateRecaptcha=true;})
   
  }

  ngOnSubmit():void {
     this._userService.setUser(this.myUserDetails).subscribe(
       data => { this.errorCode = -1 
        if(this.errorCode === -1) {
          console.log("işlem başarıyla tamamlandı.");
          this.registerSuccess=true;
          setTimeout(() => { this.registerSuccess=false;
            this._userService.sendVerificationEmail(this.myUserDetails.get('emailAddress').value);                
            this.router.navigateByUrl('/login');
      
          }, 5000);
        }
      },
       error => {this.errorCode = error;});

     
    
     
  }
  signUpGithub() {
    console.log("signUp Github");
  }
  signUpGoogle() {
    console.log("signUp Google");
  }
  signUpFacebook() {
    console.log("signUp Facebook");
  }
  signUpTwitter() {
    console.log("signUp Twitter");
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



