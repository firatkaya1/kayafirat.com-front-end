import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { UserService }                                        from './../../../Core/Service/UserService/user.service';
import { Component, OnInit }                                  from '@angular/core';
import { Router }                                             from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerSuccess:boolean = false;
  public validateRecaptcha:boolean = true;
  public errorCode:number;
    
  constructor(private _userService:UserService,private router: Router) { }

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
          this.registerSuccess=true;
          setTimeout(() => { this.registerSuccess=false;
            this._userService.sendVerificationEmail(this.myUserDetails.get('emailAddress').value);                
            this.router.navigateByUrl('/login');
      
          }, 5000);
        }
      },
       error => {this.errorCode = error; grecaptcha.reset()});

     
    
     
  }
  signUpGithub() {
    window.location.href="https://github.com/login/oauth/authorize?client_id=1766cc6e638422eeaa65";
  }
  signUpLinkedin() {
    let redirecturi:string = "http://blog.kayafirat.com/login/auth/linkedin1";
    window.location.href="https://www.linkedin.com/oauth/v2/authorization?client_id=77s8v0hceim00y&redirect_uri="+redirecturi+"&response_type=code&scope=r_liteprofile%20r_emailaddress";
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



