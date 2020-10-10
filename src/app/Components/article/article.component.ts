import { IPostSeo } from './../../Core/Model/PostSeo';
import { AuthenticateService } from './../../Core/Service/AuthenticateService/authenticate.service';
import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Title, Meta } from '@angular/platform-browser';

import { IComment } from './../../Core/Model/Comment';
import { IPostDetail } from './../../Core/Model/PostDetails';
import { PostService } from '../../Core/Service/PostService/post.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public posttitlerouter:string;
  public post:IPostDetail;
  public commentInfo:IComment[] = [];
  public postSeo:IPostSeo;
  public acceptCookie:string = this.cookieService.get('acceptCookie');
  public isSawThisPage:string = this.cookieService.get('isSawThisPage');
  public isHideCookie:boolean = false;
  public isCurrentDarkMode:boolean = false;
  public commentMessage:string;
  public commentUpdateMessage:string;
  public isAnonymous:boolean=true;
  public commentId:string;
  public postId:string;
  public commentSuccess:boolean=false;
  public commentUpdateSuccess:boolean=false;
  public commentDeleteSuccess:boolean=false;
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
    private metaService: Meta,
    private router:Router) 
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
      this._postService.setCommentAnonymous(this.post.postId,this.commentMessage,'Anonymous');
      this.clearCommentSide();
      this.validateRecaptcha=false
      setTimeout(() => { this.getPost();}, 3000);
      setTimeout(() => { this.commentSuccess=false;}, 10000);  
      

    } else {
      this.commentError = false;
      setTimeout(() => { this.commentError=true;}, 10000);
    }
 
  }
  setCommentAuthenticate(){
    if(this.commentMessage != null) {
      let username = this._authenticateService.getUserName();
      this._postService.setCommentAnonymous(this.post.postId,this.commentMessage,username);
      this.clearCommentSide();
      this.validateRecaptcha=false
      setTimeout(() => { this.getPost();}, 3000);
      setTimeout(() => { this.commentSuccess=false;}, 10000);  
 
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
    console.log("this.iss"+this.isCurrentDarkMode);
   
  }
  deChangeLink(str:string):string {
    return str.replace(/-/g, ' ');
  }
  getPost() {
    this._postService.getPost(this.posttitlerouter).subscribe(
     (res) => {
        this.post = res;
        this.commentInfo=res.comment;
        this.postSeo = res.postSeo;
        this.addMetaTags(this.postSeo);
        if(this.cookieService.check(this.post.postId)==false) {
          this.cookieService.set(this.post.postId,uuid(),0.0105);
          this._postService.getIpAddress().subscribe((resp:any) => { 
            this._postService.setPageView(this.post.postId,this.cookieService.get(this.post[0].postId),resp.ip);
          });
        }  
        
      });

  }
  clearCommentSide(){
    this.commentMessage="";
    this.commentSuccess=true;
  }
  addMetaTags(res:IPostSeo){
    this.titleService.setTitle(this.posttitlerouter);
    this.metaService.addTags([
      {name: 'keywords', content: res.metaKeywords},
      {name: 'description', content: res.metaDescription},
      {name: 'author', content: res.metaAuthor},
      {name: 'og:locale', content: 'tr_TR'},
      {name: 'og:type', content: res.metaOgType},
      {name: 'og:title', content: res.metaOgTitle},
      {name: 'og:description', content: res.metaOgDescription},
      {name: 'og:url', content: this.router.url},
      {name: 'og:site_name', content: res.metaOgSitename},
      {name: 'og:image', content: res.metaOgImage},
      {name: 'twitter:card', content: res.metaTwitterCard},
      {name: 'twitter:site', content: res.metaTwitterSite},
      {name: 'twitter:title', content: res.metaTwitterTitle},
      {name: 'twitter:description', content: res.metaTwitterDescription},
      {name: 'twitter:image', content: res.metaTwitterImage},
      {name: 'twitter:image:alt', content: res.metaTwitterTitle},
      {name: 'twitter:creator', content: res.metaTwitterCreator},
      {name: 'robots', content: 'index, follow'}
      
    ]);
    
    
  }
  updateComment(commentId:string){
    this._postService.updateComment(commentId,this.commentUpdateMessage);
    this.commentUpdateSuccess = true;
    setTimeout(() => { this.getPost(); this.commentUpdateSuccess = false;}, 2000);
  }
  setCommentId(commentId:string,postId:string){
    this.commentId = commentId;
    this.postId = postId;
  }
  clearModalCommentId(){
    this.commentId = "";
    this.postId = "";
  }
  deleteComment(){
    this._postService.deleteComment(this.commentId,this.postId);
    this.commentDeleteSuccess = true;
    setTimeout(() => { this.getPost(); this.commentDeleteSuccess = false;}, 2000);

  }
  isSameUser(username:string):boolean {
    if(username === this._authenticateService.getUserName())
      {
        return true;
      }
    return false;
  }

}