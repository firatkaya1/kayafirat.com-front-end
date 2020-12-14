import { IPost }             from './../../../Core/Model/Post';
import { PostService }       from './../../../Core/Service/PostService/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: []

})
export class PostsComponent implements OnInit {

  constructor(private _postService: PostService) { }
  
  public postIndex:IPost[];
  public maxComment:string;


  ngOnInit(): void {
    this._postService.getPostIndex().subscribe(
      res => {
        this.postIndex = res;
        
      });
  }

  enChangeLink(str:string):string{
    return str.replace(/\s+/g,'-');
  }

}
