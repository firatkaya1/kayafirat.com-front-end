import { IUser } from './../../Model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { error } from 'protractor';


@Injectable({ providedIn: 'root' })
export class AuthenticateService {

    public username:string;
    public password:string;
    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

    constructor(private http: HttpClient) {}

    login(username:string,password:string) {
      const body = {
        username:username,
        password:password
      }
       return this.http.post("http://localhost:8080/api/v1/user/login",body, { responseType: "text"});
    

    }
    createBasicAuthToken(username: String, password: String) {
      console.log("created token");
      return 'Basic ' + window.btoa(username + ":" + password)
    }
    registerSuccessfulLogin(username) {
      sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    }
    isAdmin(username:string){
      console.log("");
    }

    logout() {
      sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
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


}