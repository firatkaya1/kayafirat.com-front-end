import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {

  private BASE_URL = "http://localhost:8080";
    secretKey = "YourSecretKeyForEncryption&Descryption";
    public username:string;
    public password:string;

    constructor(private http: HttpClient,private cookieService:CookieService) {}

    login(username:string,password:string) {
       return this.http.post(this.BASE_URL+"/v1/login",{username:username,password:password}, { responseType: "text"});
    

    }
    loginGithub(code:string) {
       return this.http.post(this.BASE_URL+"/v1/auth/github?code="+code,"");
    }
    loginLinkedin(code:string){
       return this.http.post(this.BASE_URL+"/v1/auth/linkedin?code="+code,"");
    }
    createBasicAuthToken(username: String, password: String) {
      return 'Basic ' + window.btoa(username + ":" + password)
    }


    logout() {
      this.username = null;
      this.password = null;
      this.http.post(this.BASE_URL+"/v1/logout","").subscribe(data => {});
    }


    isUserLoggedIn() {
      return this.cookieService.get('username').length>1 ? true : false;
  }
  
    getUserPhoto(){
      return this.cookieService.get('userPhoto');
    }
    getUserName(){
     return this.cookieService.get('username');
      
    }
  
    
}