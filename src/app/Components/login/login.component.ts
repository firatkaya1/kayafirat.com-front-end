import { Router } from '@angular/router';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  public invalidLogin:boolean = false;
  public loginSuccess:boolean = false;
  public validateRecaptcha:boolean = true;
 
  constructor(private _userService:UserServiceService,private _authService:AuthenticateService,private router:Router ) {}

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
  /* Sign in with social media accounts */
  signInGithub() {
    window.location.href="https://github.com/login/oauth/authorize?client_id=1766cc6e638422eeaa65";
  }
  signInGoogle() {
  }
  signInLinkedin() {
    window.location.href="https://www.linkedin.com/oauth/v2/authorization?client_id=77s8v0hceim00y&redirect_uri=http://localhost:4200/login/auth/linkedin&response_type=code&scope=r_liteprofile%20r_emailaddress";
  }
}
