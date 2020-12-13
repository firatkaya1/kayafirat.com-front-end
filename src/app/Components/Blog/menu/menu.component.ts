import { AuthenticateService } from './../../../Core/Service/AuthenticateService/authenticate.service';
import {TranslateService}      from '@ngx-translate/core';
import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  public username:string = "";
  public userprofilphoto:string = "";
  public selectedLanguage:string="tr";


  constructor(private authenticateService:AuthenticateService, private router:Router, private translate: TranslateService ) {
    if(localStorage.getItem("language")==null){
      localStorage.setItem("language","tr");
      translate.setDefaultLang('tr');
      this.selectedLanguage="tr";
    } else {
      translate.setDefaultLang(localStorage.getItem("language"));
      this.selectedLanguage=localStorage.getItem("language");
    }
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

   changeLanguage(){
    if(this.selectedLanguage=="tr"){
      this.selectedLanguage = "en";
      localStorage.setItem("language","en");
      this.translate.setDefaultLang("en");
      
    } else {
      this.selectedLanguage = "tr";
      localStorage.setItem("language","tr");
      this.translate.setDefaultLang("tr");

    }
    
   }

}
