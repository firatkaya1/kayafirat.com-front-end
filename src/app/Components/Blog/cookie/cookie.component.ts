import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  public acceptCookie:string = this.cookieService.get('acceptCookie');
  public isHideCookie:boolean = false;

  constructor( private cookieService: CookieService) { }


  ngOnInit(): void {
  }

  acceptsCookie() {
    this.cookieService.set('acceptCookie','true',5);
    this.acceptCookie = this.cookieService.get('acceptCookie');
  }

  hideCookie() {
    this.isHideCookie =true;
  }
}
