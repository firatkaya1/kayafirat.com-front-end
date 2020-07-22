import { IUserPermissions } from './../Models/UserPermissions';
import { IUser } from './../Models/User';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from './../user-service.service';

import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  public usernamerouter:string;
  public users:IUser[];
  public errormessage:ErrorHandler;

 

  myUserPermissions = new FormGroup({
    username: new FormControl(),
    userAboutMe:new FormControl(),
    userRegisterDate:new FormControl(),
    userBirthDate:new FormControl(),
    userMailAdress:new FormControl(),
    userLastSeen:new FormControl(),
    userShowAllComment:new FormControl(),
    userShowAllFav:new FormControl(),
    userGithubAddress:new FormControl(),
    userLinkedinAddress:new FormControl()
  
  }); 



  constructor(private route: ActivatedRoute,
              private _userService: UserServiceService) { 

   this.route.paramMap.subscribe(params => {
    this.usernamerouter = params.get('username');
   });
  }

  ngOnInit(): void {
    this.getUserPermissions();      
}

  ngOnSubmit():void {
    let body = {
      userEmail: "",
      nameShow: false,
      aboutmeShow: this.myUserPermissions.controls['userAboutMe'].value,
      registerdateShow:this.myUserPermissions.controls['userRegisterDate'].value,
      birthdateShow: this.myUserPermissions.controls['userBirthDate'].value,
      contactShow: this.myUserPermissions.controls['userMailAdress'].value,
      lastSeenShow:this.myUserPermissions.controls['userLastSeen'].value,
      allCommentShow:  this.myUserPermissions.controls['userShowAllComment'].value,
      allFavShow: this.myUserPermissions.controls['userShowAllFav'].value,
      githubShow: this.myUserPermissions.controls['userGithubAddress'].value,
      linkedinShow:this.myUserPermissions.controls['userLinkedinAddress'].value
  };
  this._userService.updateUserPermissions(this.usernamerouter,body);

}

  getUserPermissions(){
    this._userService.getUserByUsername(this.usernamerouter).subscribe(
      res => {
        this.users = res;
        this.myUserPermissions.controls['username'].setValue(this.users[0].userPermissions.nameShow);
        this.myUserPermissions.controls['userAboutMe'].setValue(this.users[0].userPermissions.aboutmeShow);
        this.myUserPermissions.controls['userRegisterDate'].setValue(this.users[0].userPermissions.registerdateShow);
        this.myUserPermissions.controls['userBirthDate'].setValue(this.users[0].userPermissions.birthdateShow);
        this.myUserPermissions.controls['userMailAdress'].setValue(this.users[0].userPermissions.contactShow);
        this.myUserPermissions.controls['userLastSeen'].setValue(this.users[0].userPermissions.lastSeenShow);
        this.myUserPermissions.controls['userShowAllComment'].setValue(this.users[0].userPermissions.allCommentShow);
        this.myUserPermissions.controls['userShowAllFav'].setValue(this.users[0].userPermissions.allFavShow);
        this.myUserPermissions.controls['userGithubAddress'].setValue(this.users[0].userPermissions.githubShow);
        this.myUserPermissions.controls['userLinkedinAddress'].setValue(this.users[0].userPermissions.linkedinShow);});
  }

  updateUserGithubAddres(githubaddress:string){
    console.log("test:"+githubaddress);
  }
  updateUserLinkedinAddress(linkedinaddress:string){
    console.log("test:"+linkedinaddress);
    
  }
  updateUserBirthDate(birthdate:string){
    console.log("test:"+birthdate);

  }
  updateUserPass(pass:string){
    console.log("test"+pass);
  }

  updateUserUsername(username:string){
    console.log("test"+username);
  }

}