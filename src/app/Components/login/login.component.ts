import { Router } from '@angular/router';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public invalidLogin:boolean = false;
  public loginSuccess:boolean = false;
  public validateRecaptcha:boolean = true;
 
  constructor(private _userService:UserServiceService,private _authService:AuthenticateService,private router:Router) { }

  ngOnInit(): void {
    if(this._authService.isUserLoggedIn()){
      this.router.navigateByUrl("/");
    }
  }
  ngOnSubmit(username:string,password:string) {
    this._authService.login(username,password)
    .subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this._authService.registerSuccessfulLogin(result);
     this._userService.getUserPhoto(username).subscribe(data => 
      {
        this._authService.setPhotoandUser(data[0],data[1])
      }
      );
      setTimeout(() => {    window.location.reload();}, 1000);
    }, (error) => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    }
    
    );
  }
  resolved(captchaResponse:string) {
    this._userService.validateReCaptcha(captchaResponse).subscribe(res => {
      res['success'] == true ? this.validateRecaptcha=false : this.validateRecaptcha=true; })
    
  }

}
