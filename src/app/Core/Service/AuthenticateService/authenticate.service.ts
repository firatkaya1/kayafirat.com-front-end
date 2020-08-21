import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";


@Injectable({ providedIn: 'root' })
export class AuthenticateService {

    public username:string;
    public password:string;
    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
    USER_NAME_SESSION_PROFİLE_PHOTO = 'xs34rfdkwJJ'
    USER_NAME_SESSION_USER_NAME = 'tSC31DGH51'

    constructor(private http: HttpClient) {}

    login(username:string,password:string) {
      const body = {
        username:username,
        password:password
      }
       return this.http.post("http://localhost:8080/api/v1/user/login",body, { responseType: "text"});
    

    }
    loginGithub(code:string) {
      const body = {
        code:code
      }
       return this.http.post("http://localhost:8080/api/v1/user/auth/github",body,{ responseType: "text"});
    

    }

    loginLinkedin(code:string){
      const body = {
        code:code
      }
       return this.http.post("http://localhost:8080/api/v1/user/auth/linkedin",body,{ responseType: "text"});
    }
    createBasicAuthToken(username: String, password: String) {
      return 'Basic ' + window.btoa(username + ":" + password)
    }
    registerSuccessfulLogin(username) {
      //add JWT 
      sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    }
    setPhotoandUser(username:string,photoPath:string){
       //add user photo url
       sessionStorage.setItem(this.USER_NAME_SESSION_PROFİLE_PHOTO,photoPath);
       //add username
       sessionStorage.setItem(this.USER_NAME_SESSION_USER_NAME,username);
    }

    logout() {
      sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
      sessionStorage.removeItem(this.USER_NAME_SESSION_USER_NAME);
      sessionStorage.removeItem(this.USER_NAME_SESSION_PROFİLE_PHOTO);
      this.username = null;
      this.password = null;
    }


    isUserLoggedIn() {
      let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
      if (user === null) return false
      return true
    }
  
    getLoggedInUserName() {
      let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
      if (user === null) return ''
      return user
    }

    getUserPhoto(){
      return sessionStorage.getItem(this.USER_NAME_SESSION_PROFİLE_PHOTO);
    }
    getUserName(){
      return sessionStorage.getItem(this.USER_NAME_SESSION_USER_NAME);
    }
    getJWTEmail(jwt:any){
      return jwt_decode(jwt).sub;
    }
}