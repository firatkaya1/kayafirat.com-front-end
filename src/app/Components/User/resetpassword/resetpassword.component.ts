import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { UserService }                                        from './../../../Core/Service/UserService/user.service';
import { ActivatedRoute,Router }                              from '@angular/router';
import { Component, OnInit }                                  from '@angular/core';
import * as jwt_decode                                        from "jwt-decode";
import * as Bowser                                            from "bowser";



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styles: []
})
export class ResetpasswordComponent implements OnInit {

  public token:string;
  public resetSuccess:boolean = false;
  public isTokenExpired:boolean;
  public jti:string;
  public sub:string;

  constructor(private route: ActivatedRoute,private _userService:UserService,private router: Router) {

    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.jti=jwt_decode(this.token).jti;
      this.sub =jwt_decode(this.token).sub;
      });
   }
   
  myUserDetails = new FormGroup({
    password: new FormControl(null,[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24),
      upperCaseValidator,
      lowerCaseValidator,
      numberValidator])}); 

  ngOnInit(): void {  
    var current_time = new Date().getTime() / 1000;
    if(current_time < jwt_decode(this.token).exp && jwt_decode(this.token).xts === "F562S1WFASXE") {
      this.isTokenExpired=false;
    } else {
      this.isTokenExpired=true;
    }
  }

  ngOnSubmit():void{
    var current_time = new Date().getTime() / 1000;
    if(current_time < jwt_decode(this.token).exp && jwt_decode(this.token).xts === "F562S1WFASXE" ) {
      const userAgent = Bowser.parse(window.navigator.userAgent).browser.name +" Version:"+ Bowser.parse(window.navigator.userAgent).browser.version +" "+Bowser.parse(window.navigator.userAgent).os.name;
      this._userService.getIpAddress().subscribe((data:any) => {
        this._userService.forgotUserPassword(this.jti,this.sub,this.myUserDetails.controls['password'].value,data.ip ,userAgent);
      });
      
      this.isTokenExpired=false;
      this.resetSuccess=true;

      setTimeout(() => { this.resetSuccess=false;
        this.router.navigateByUrl('/login');}, 5000);
    } else {
      this.isTokenExpired=true;
    }
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