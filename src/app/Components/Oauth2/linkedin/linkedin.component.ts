import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute}        from '@angular/router';
import { AuthenticateService }  from './../../../Core/Service/AuthenticateService/authenticate.service';
import { Router }               from '@angular/router';
import { NgxSpinnerService }    from "ngx-spinner";

@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent implements OnInit {

  private code:string;
  public isSuccess:boolean = true;

  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService,private _authService:AuthenticateService,private router: Router) { 
    this.spinner.show();
    this.code = this.route.snapshot.queryParamMap.get('code');
    this._authService.loginLinkedin(this.code).subscribe(
      result => 
      {
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.router.navigate(["/"]);
      } ,
      error => {this.spinner.hide();this.isSuccess=false});

  }

  ngOnInit(): void {
  }

}
