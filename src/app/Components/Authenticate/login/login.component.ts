import { Router }              from '@angular/router';
import { AuthenticateService } from './../../../Core/Service/AuthenticateService/authenticate.service';
import { Component, OnInit }   from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  public invalidLogin:boolean = false;
  public loginSuccess:boolean = false;
  public validateRecaptcha:boolean = true;
  public recaptcha:string = "";

  constructor(private _authService:AuthenticateService,private router:Router ) {}

  ngOnInit(): void {
    if(this._authService.isUserLoggedIn()){
      this.router.navigateByUrl("/");
    }
  }
  ngOnSubmit(username:string,password:string) {
    this._authService.login(username,password,this.recaptcha)
    .subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;      
      setTimeout(() => {    window.location.reload();}, 1000);
    }, (error) => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      grecaptcha.reset();
    }
    
    );
  }
  resolved(captchaResponse:string) {
    this.recaptcha = captchaResponse;
  }
    /* Sign in with social media accounts */
  signInGithub() {
    window.location.href="https://github.com/login/oauth/authorize?client_id=b83e481507d79fcfbb79";
  }
  
  signInLinkedin() {
    window.location.href="https://www.linkedin.com/oauth/v2/authorization?client_id=77s8v0hceim00y&redirect_uri=https://blog.kayafirat.com/login/auth/linkedin&response_type=code&scope=r_liteprofile%20r_emailaddress";
  }
}
