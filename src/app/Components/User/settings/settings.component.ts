import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserServiceService }              from './../../../Core/Service/UserService/user-service.service';
import { FormGroup, FormControl }          from '@angular/forms';
import { ActivatedRoute, Router}           from '@angular/router';
import * as Bowser                         from "bowser";
import { IUser }                           from './../../../Core/Model/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
  
})

export class SettingsComponent implements OnInit {

  public usernamerouter:string;
  public users:IUser[] = [];
  public errormessage:ErrorHandler;
  public success:boolean = false;
  public sendVerifyButton:boolean = true;
  public selectedImage:File;
 

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

  constructor(private route: ActivatedRoute,private _userService: UserServiceService,private router: Router) { 
   this.route.paramMap.subscribe(params => {
    this.usernamerouter = params.get('username');
   });
  }

  ngOnInit(): void {
    this.getUserPermissions();      
  }
  ngOnSubmit():void {
    let body = {
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
  this._userService.updateUserPermissions(body);
  this.success=true;
  setTimeout(() => {
    this.success=false;
  }, 5000);

  } 
  getUserPermissions(){
    this._userService.getUser(this.usernamerouter).subscribe(
      res => {  
        this.users[0] = res;
        this.myUserPermissions.controls['username'].setValue(this.users[0].userPermissions.nameShow);
        this.myUserPermissions.controls['userAboutMe'].setValue(this.users[0].userPermissions.aboutmeShow);
        this.myUserPermissions.controls['userRegisterDate'].setValue(this.users[0].userPermissions.registerdateShow);
        this.myUserPermissions.controls['userBirthDate'].setValue(this.users[0].userPermissions.birthdateShow);
        this.myUserPermissions.controls['userMailAdress'].setValue(this.users[0].userPermissions.contactShow);
        this.myUserPermissions.controls['userLastSeen'].setValue(this.users[0].userPermissions.lastSeenShow);
        this.myUserPermissions.controls['userShowAllComment'].setValue(this.users[0].userPermissions.allCommentShow);
        this.myUserPermissions.controls['userShowAllFav'].setValue(this.users[0].userPermissions.allFavShow);
        this.myUserPermissions.controls['userGithubAddress'].setValue(this.users[0].userPermissions.githubShow);
        this.myUserPermissions.controls['userLinkedinAddress'].setValue(this.users[0].userPermissions.linkedinShow);
      }, 
      error => {
        this.router.navigateByUrl('/404');
      }  
        
        );
  }
  updateUserGithubAddres(githubaddress:string){
    this._userService.updateUserGithubAddress(githubaddress);
    setTimeout(() => {
      this.getUserPermissions();
    }, 1000);

    this.success=true;
    setTimeout(() => {
      this.success=false;
    }, 5000);
  }
  updateUserLinkedinAddress(linkedinaddress:string){
    this._userService.updateUserLinkedinAddress(linkedinaddress);
    setTimeout(() => {
      this.getUserPermissions();
    }, 1000);

    this.success=true;
    setTimeout(() => {
      this.success=false;
    }, 5000);
    
  }
  updateUserBirthDate(birthdate:string){
    this._userService.updateUserBirthDate(birthdate);
    setTimeout(() => {
      this.getUserPermissions();
    }, 1000);


  this.success=true;
  setTimeout(() => {
    this.success=false;
  }, 5000);

  }
  updateUserPass(userid:string,pass:string){
    const userAgent = Bowser.parse(window.navigator.userAgent).browser.name +" Version:"+ Bowser.parse(window.navigator.userAgent).browser.version +" "+Bowser.parse(window.navigator.userAgent).os.name;
    this._userService.getIpAddress().subscribe((data:any) => {
      this._userService.updateUserPassword(userid,pass,data.ip,userAgent);
    });
    
    setTimeout(() => {this.getUserPermissions();}, 1000);
    this.success=true;
    setTimeout(() => {this.success=false;},5000);
  }
  updateUserUsername(username:string){
    this._userService.updateUserName(username);
    setTimeout(() => {
      this.getUserPermissions();
      sessionStorage.setItem('tSC31DGH51',username);
      this.router.navigateByUrl('/settings/'+username);
    }, 1000);


    this.success=true;
      setTimeout(() => {
        this.success=false;
      }, 5000);
  }
  sendUserVerificationMail(email:string){
    this._userService.sendVerificationEmail(email);
    this.sendVerifyButton=false;
    this.success=true;
        setTimeout(() => {
          this.success=false;
        }, 5000);

        setTimeout(() => {
          this.sendVerifyButton=true;
        }, 30000);
  }
  updateUserProfilPhoto(){
    this._userService.updateUserProfilPhoto(this.selectedImage).subscribe(data => {});
    this.success=true;
        setTimeout(() => {
          this.success=false;
        }, 5000);
        
  }
  onFileChanged(event) {
    this.selectedImage = event.target.files[0]
  }

}