import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Title, Meta } from '@angular/platform-browser';
import * as jwt_decode from "jwt-decode";

import { IComment } from './../../Core/Model/Comment';
import { IPostDetail } from './../../Core/Model/PostDetails';
import { PostService } from '../../Core/Service/PostService/post.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  public posttitlerouter:string;
  public postInfo:IPostDetail[];
  public commentInfo:IComment[];
  public acceptCookie:string = this.cookieService.get('acceptCookie');
  public isSawThisPage:string = this.cookieService.get('isSawThisPage');
  public isHideCookie:boolean = false;
  public isCurrentDarkMode:boolean = false;
  public commentMessage:string;
  public isAnonymous:boolean=true;
  public commentSuccess:boolean=false;
  public commentError:boolean=true;
  public validateRecaptcha:boolean = false;
  public isAuthenticate:boolean = false;
  

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private _postService:PostService,
    private _userService:UserServiceService,
    private _authenticateService:AuthenticateService,
    private titleService: Title,
    private metaService: Meta) 
    {
    this.route.paramMap.subscribe(params => {
      this.posttitlerouter = this.deChangeLink(params.get('postTitle'));
      });
      if(this._authenticateService.isUserLoggedIn()) {
        this.isAuthenticate = true;
      }
              
  }
  
  ngOnInit(): void {
    this.getPost();
  
    
  }
  resolved(captchaResponse:string) {
    this._userService.validateReCaptcha(captchaResponse).subscribe(res => {
      res['success'] == true ? this.validateRecaptcha=true : this.validateRecaptcha=false;})
   
  }
  setCommentAnonymous(){
    if(this.isAnonymous && this.commentMessage != null) {
     this._postService.setCommentAnonymous(this.postInfo[0].postId,this.commentMessage,'Anonymous');
     this.clearCommentSide();
    
      
      setTimeout(() => { this.commentSuccess=false;
        this.validateRecaptcha=false}, 10000);
        
        setTimeout(() => { this.getPost();}, 1000);

    } else {
      this.commentError = false;
      setTimeout(() => { this.commentError=true;}, 10000);
    }
    
    //
  }
  setCommentAuthenticate(){
    if(this.commentMessage != null) {
      let username = jwt_decode(this._authenticateService.getLoggedInUserName()).sub;
      this._postService.setCommentAnonymous(this.postInfo[0].postId,this.commentMessage,username);
      this.clearCommentSide();
       setTimeout(() => { this.commentSuccess=false;
         this.validateRecaptcha=false}, 10000);
         
         setTimeout(() => { this.getPost();}, 1000);
 
     } else {
       this.commentError = false;
       setTimeout(() => { this.commentError=true;}, 10000);
     }
  }
  acceptsCookie() {
    this.cookieService.set('acceptCookie','true',5);
    this.acceptCookie = this.cookieService.get('acceptCookie');
  }
  hideCookie() {
    this.isHideCookie =true;
  }
  openDarkMode() {
    this.isCurrentDarkMode = this.isCurrentDarkMode ? false : true; 
  }
  deChangeLink(str:string):string {
    return str.replace(/-/g, ' ');
  }
  getPost() {
    this._postService.getPost(this.posttitlerouter).subscribe(
      res => {
        this.postInfo = res;
        this.commentInfo=this.postInfo[0].comment;
        if(this.cookieService.check(this.postInfo[0].postId)==false) {
          this.cookieService.set(this.postInfo[0].postId,uuid(),0.0105);
          this._postService.getIpAddress().subscribe((resp:any) => { 
            this._postService.setPageView(this.postInfo[0].postId,this.cookieService.get(this.postInfo[0].postId),resp.ip);
          });
        }  
      });
  }
  clearCommentSide(){
    this.commentMessage="";
    this.commentSuccess=true;
  }
  addMetaTags(){
    console.log("calisti :");
    this.titleService.setTitle(this.posttitlerouter);
    this.metaService.addTags([
      {name: 'keywords', content: 'Angular, Universal, Example'},
      {name: 'description', content: 'Angular Universal Example'},
      {name: 'robots', content: 'index, follow'}
    ]);

  }
  
  updateComment(){
    console.log("tiklandi");
  }

  deleteComment(){
    console.log("tiklandi");
  }



}