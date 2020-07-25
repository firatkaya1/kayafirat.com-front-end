import { IPostDetail } from './Models/PostDetails';
import { IPost } from './Models/Post';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private myPosts:string = "http://localhost:8080/api/v1/post/lastposts/10/desc";
  private myPost:string = "http://localhost:8080/api/v1/post/postTitle/";
  private addCommentUrl:string = "http://localhost:8080/api/v1/comment/";
  private addPageView:string = "http://localhost:8080/api/v1/post/updateview";
  private orderByDate:string = "http://localhost:8080/api/v1/post/";
  private postTagUrl:string = "http://localhost:8080/api/v1/post/postTag/";

  constructor(private http:HttpClient) { }

  getPostIndex(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.myPosts);
  }
  getPost(postTitle:string): Observable<IPostDetail[]> {
    return this.http.get<IPostDetail[]>(this.myPost.concat(postTitle));
  }
  
  getPostByTitle(postTag:string): Observable<IPostDetail[]> {
    return this.http.get<IPostDetail[]>(this.myPost.concat(postTag));
  }

  getPostOrderBy(pageNumber:string,pageSize:string,sortedName:string,orderby:string){
    return this.http.get<IPost[]>(this.orderByDate.concat(pageNumber).concat("/")
    .concat(pageSize).concat("/sorted/").concat(sortedName).concat("/orderby/").concat(orderby));
  }
  getPostByTag(postTag:string):Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postTagUrl.concat(postTag));
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