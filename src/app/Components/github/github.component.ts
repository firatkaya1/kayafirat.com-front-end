import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  private code:string;
  public isSuccess:boolean = true;
  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService,private _authService:AuthenticateService,private router: Router) { 
    this.spinner.show();
    this.code = this.route.snapshot.queryParamMap.get('code');
    this._authService.loginGithub(this.code).subscribe(
      (result) => 
      {
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.router.navigate(["/"]);  
      },
      (error) => {this.spinner.hide(); console.log("error :"+error);this.isSuccess=false});

  }

  ngOnInit(): void {
  }

}
