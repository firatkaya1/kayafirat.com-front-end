import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { IUser } from './../../Core/Model/User';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import * as Bowser from "bowser";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
  
})

export class SettingsComponent implements OnInit {

  public usernamerouter:string;
  public users:IUser[];
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



  constructor(private route: ActivatedRoute,
              private _userService: UserServiceService,private router: Router) { 

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
  this.success=true;
  setTimeout(() => {
    this.success=false;
  }, 5000);

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
        this.myUserPermissions.controls['userLinkedinAddress'].setValue(this.users[0].userPermissions.linkedinShow);
      }, 
      error => {
        this.router.navigateByUrl('/404');
      }  
        
        );
  }

  updateUserGithubAddres(email:string,githubaddress:string){
    this._userService.updateUserGithubAddress(email,githubaddress);
    setTimeout(() => {
      this.getUserPermissions();
    }, 1000);

    this.success=true;
    setTimeout(() => {
      this.success=false;
    }, 5000);
  }
  updateUserLinkedinAddress(email:string,linkedinaddress:string){
    this._userService.updateUserLinkedinAddress(email,linkedinaddress);
    setTimeout(() => {
      this.getUserPermissions();
    }, 1000);

    this.success=true;
    setTimeout(() => {
      this.success=false;
    }, 5000);
    
  }
  updateUserBirthDate(email:string,birthdate:string){
    this._userService.updateUserBirthDate(email,birthdate);
    setTimeout(() => {
      this.getUserPermissions();
    }, 1000);


  this.success=true;
  setTimeout(() => {
    this.success=false;
  }, 5000);

  }
  updateUserPass(email:string,pass:string){
    const userAgent = Bowser.parse(window.navigator.userAgent).browser.name +" Version:"+ Bowser.parse(window.navigator.userAgent).browser.version +" "+Bowser.parse(window.navigator.userAgent).os.name;
    console.log("useragent:"+userAgent);
    this._userService.getIpAddress().subscribe((data:any) => {
      this._userService.updateUserPassword(email,pass,data.ip,userAgent);
    });
    
    setTimeout(() => {this.getUserPermissions();}, 1000);
    this.success=true;
    setTimeout(() => {this.success=false;},5000);
  }

  updateUserUsername(email:string,username:string){
    this._userService.updateUserName(email,username);
    setTimeout(() => {
      this.getUserPermissions();
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
 updateUserProfilPhoto(userId:string){
   this._userService.updateUserProfilPhoto(userId,this.selectedImage);
   this.success=true;
      setTimeout(() => {
        this.success=false;
      }, 5000);
 }
 onFileChanged(event) {
  this.selectedImage = event.target.files[0]
  console.log("selected:"+this.selectedImage);
}

}