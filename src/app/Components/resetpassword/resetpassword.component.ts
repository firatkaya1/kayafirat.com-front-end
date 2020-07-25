import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import * as jwt_decode from "jwt-decode";



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  public token:string;
  public resetSuccess:boolean = false;
  public isTokenExpired:boolean;
  public jti:string;
  public sub:string;

  constructor(private route: ActivatedRoute,private _userService:UserServiceService,private router: Router) {

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
    if(current_time < jwt_decode(this.token).exp) {
      this.isTokenExpired=false;
      console.log("dolmadı:");
    } else {
      this.isTokenExpired=true;
      console.log("doldu:");
    }
  }

  ngOnSubmit():void{
    var current_time = new Date().getTime() / 1000;
    if(current_time < jwt_decode(this.token).exp) {
      this._userService.updateUserPassword(this.jti,this.myUserDetails.controls['password'].value);
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