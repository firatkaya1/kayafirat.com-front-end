import { IPostDetail } from './../../Model/PostDetails';
import { IPost } from './../../Model/Post';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL = "http://localhost:8080";
  private myPosts:string = this.BASE_URL+"/v1/post/last?limit=10&order=desc";
  private postTitle:string = this.BASE_URL+"/v1/post/title?title=";
  private addCommentUrl:string = this.BASE_URL+"/v1/comment?id=";
  private addPageView:string = this.BASE_URL+"/v1/post/updateview";
  private orderByDate:string = this.BASE_URL+"/v1/post?";
  private postTagUrl:string = this.BASE_URL+"/v1/post/tag?tag=";

  private updateCommentURL:string =  this.BASE_URL+"/v1/comment";
  private deleteCommentURL:string = this.BASE_URL+"/v1/comment?commentId=";

  constructor(private http:HttpClient) { }

  getPostIndex(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.myPosts);
  }
  getPost(title:string): Observable<IPostDetail> {
    return this.http.get<IPostDetail>(this.postTitle.concat(title));
  }
  
  getPostOrderBy(pageNumber:string,pageSize:string,sortedName:string,orderby:string){
    let query:string = "page="+pageNumber+"&size="+pageSize+"&sort="+sortedName+"&order="+orderby;
    return this.http.get<IPost[]>(this.orderByDate.concat(query));
  }
  getPostByTag(postTag:string):Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postTagUrl.concat(postTag));
  }

  getIpAddress(){
    let headers = new HttpHeaders({
      'ipAddress' : '' });
    let options = { headers: headers };
    return this.http.get<string>("https://www.cloudflare.com/cdn-cgi/trace",options);
  }
  setPageView(postId:string,temporaryCode:string,ipAddress:string){
    const body = { ipAddress:ipAddress,temporaryCode:temporaryCode,postId:postId }
    
    this.http.post<Comment>(this.addPageView, body).subscribe(data => {}) 
  }
  setCommentAnonymous(postId:string,comment:string,username:string,captcha:string):void {
    let headers = new HttpHeaders({
      'skip' : '' });
    this.http.post<Comment>(this.addCommentUrl.concat(postId).concat("&captcha=").concat(captcha), {username:username,commentMessage:comment}).subscribe(data => {}) 
        
  }

  updateComment(_commentId:string,_commentMessage:string){
    let body = 
    {
      commentId:_commentId,
      commentMessage:_commentMessage
      
    };
    this.http.put<Comment>(this.updateCommentURL,body).subscribe(data => {}) ;

  }
  deleteComment(_commentId:string,_postId:string){
    this.http.delete<Comment>(this.deleteCommentURL.concat(_commentId).concat("&postId=").concat(_postId)).subscribe(
      data => {},
      error => {console.log("error : "+error)} );
  }

}
