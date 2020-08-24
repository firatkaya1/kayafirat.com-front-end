import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  public username:string = "";
  public userprofilphoto:string = "";


  constructor(private authenticateService:AuthenticateService,
              private router:Router,
              private translate: TranslateService ) {
                translate.setDefaultLang('tr');
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
