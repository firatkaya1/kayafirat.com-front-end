import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Router } from '@angular/router';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  public username:string = "";
  public userprofilphoto:string = "";


  constructor(private authenticateService:AuthenticateService,private router:Router,private  _userService:UserServiceService) {

  }

  ngOnInit(): void {
    this.getPhotoAndUsername();
  }
  ngOnChange(){
    this.getPhotoAndUsername();
  }

   logout(){
     this.authenticateService.logout();
     this.username="";
     this.userprofilphoto="";
     this.router.navigate(["/"]);
   }

   isAuthentication(){
    if(this.authenticateService.isUserLoggedIn()) return true;
    return false;
   }

   getPhotoAndUsername(){
    if(this.authenticateService.isUserLoggedIn()){
      this.username = this.authenticateService.getUserName();
      this.userprofilphoto = this.authenticateService.getUserPhoto();
    }
   }

}
