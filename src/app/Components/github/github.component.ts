import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  private code:string;

  constructor(private route: ActivatedRoute,private _authService:AuthenticateService,private _userService:UserServiceService,private router: Router) { 
    this.code = this.route.snapshot.queryParamMap.get('code');
    this._authService.loginGithub(this.code).subscribe(
      result => 
      {
        this._authService.registerSuccessfulLogin(result);
        this._userService.getUserPhoto(this._authService.getJWTEmail(result)).subscribe(
        (data) => {
                    this._authService.setPhotoandUser(data[0],data[1])
                  });   
      });

      setTimeout(() => { this.router.navigateByUrl('/'); }, 2000);
  }

  ngOnInit(): void {
  }

}
