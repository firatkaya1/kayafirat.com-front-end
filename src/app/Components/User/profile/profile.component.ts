import { AuthenticateService }   from './../../../Core/Service/AuthenticateService/authenticate.service';
import { UserService}            from './../../../Core/Service/UserService/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit }     from '@angular/core';
import { IUser }                 from './../../../Core/Model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usernamerouter:string;
  public users:IUser[] = [];
  public isSameUser:string;
  public isUserLogged:boolean;

  constructor(private route: ActivatedRoute,private _userService: UserService,private _auhtService:AuthenticateService,private router:Router) { 
      this.route.paramMap.subscribe(params => {
        this.usernamerouter = params.get('username');
        this.isUserLogged = this._auhtService.isUserLoggedIn();
        this.getUserInfo(this.usernamerouter);
      });
}

  ngOnInit(): void {
    
    if(this.isUserLogged){
      this.isSameUser =this._auhtService.getUserName();
    } else {
      this.router.navigateByUrl('403');
    }

  }

  getUserInfo(username:string){
    if(this.isUserLogged){
      this._userService.getUser(username).subscribe
      (data => { this.users[0] = data; });
    }
    
  }
}
