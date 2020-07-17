import { IPostDetail } from './Models/PostDetails';
import { IPost } from './Models/Post';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private myPosts:string = "http://localhost:8080/api/v1/post/lastposts/10/asc";
  private myPost:string = "http://localhost:8080/api/v1/post/postTitle/";
  private addCommentUrl:string = "http://localhost:8080/api/v1/comment/";
  private addPageView:string = "http://localhost:8080/api/v1/post/updateview";

  constructor(private http:HttpClient) { }

  getPostIndex(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.myPosts);
  }
  getPost(postTitle:string): Observable<IPostDetail[]> {
    return this.http.get<IPostDetail[]>(this.myPost.concat(postTitle));
  }
  getIpAddress(){
    return this.http.get<string>("http://api.ipify.org/?format=json");
  }
  setPageView(postId:string,temporaryCode:string,ipAddress:string){
    this.http.post<Comment>(this.addPageView, { ipAddress:ipAddress,temporaryCode:temporaryCode,postId:postId }).subscribe(data => {}) 
  }
  setCommentAnonymous(postId:string,comment:string,userId:string):void {
    this.http.post<Comment>(this.addCommentUrl.concat(postId), { userId:userId,commentMessage:comment }).subscribe(data => {}) 
        
  }

}
