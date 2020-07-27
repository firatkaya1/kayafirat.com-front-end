import { IPostDetail } from './../../Model/PostDetails';
import { IPost } from './../../Model/Post';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
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
    let headers = new HttpHeaders({
      'skip' : '' });
    let options = { headers: headers };
    return this.http.get<string>("http://api.ipify.org/?format=json",options);
  }
  setPageView(postId:string,temporaryCode:string,ipAddress:string){
    const body = { ipAddress:ipAddress,temporaryCode:temporaryCode,postId:postId }
    
    this.http.post<Comment>(this.addPageView, body).subscribe(data => {}) 
  }
  setCommentAnonymous(postId:string,comment:string,username:string):void {
    this.http.post<Comment>(this.addCommentUrl.concat(postId), { username:username,commentMessage:comment }).subscribe(data => {}) 
        
  }

}
