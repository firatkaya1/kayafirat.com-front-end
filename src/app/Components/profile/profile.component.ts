import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { IUser } from './../../Core/Model/User';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public usernamerouter:string;
  public userInfo:IUser[];

  constructor(private route: ActivatedRoute,
    private _userService: UserServiceService,
    private _route:Router) { 

      this.route.paramMap.subscribe(params => {
      this.usernamerouter = params.get('username');
      this.getUserInfo(this.usernamerouter);
      });
}

  ngOnInit(): void {
  }

  getUserInfo(username:string){
    this._userService.getUserByUsername(username).subscribe(data => {
      this.userInfo = data;
    });
  }
}
