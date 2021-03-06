import { UserService }        from './../../../Core/Service/UserService/user.service';
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute}      from '@angular/router';
import * as jwt_decode        from "jwt-decode";

@Component({
  selector: 'app-confirmaccount',
  templateUrl: './confirmaccount.component.html',
  styles: []
})
export class ConfirmaccountComponent implements OnInit {

  public token:string;
  public isTokenExpired:boolean;
  public jti:string;
  public sub:string;

  constructor(private route: ActivatedRoute,private _userService:UserService) { 
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.jti=jwt_decode(this.token).jti;
      this.sub =jwt_decode(this.token).sub;
      });
      
  }

  ngOnInit(): void {
    var current_time = new Date().getTime() / 1000;
    if(current_time < jwt_decode(this.token).exp) {
      this._userService.updateUserVerification(this.jti,this.sub);
      this.isTokenExpired=false;
    } else {
      this.isTokenExpired=true;
    }
  }


  
}
