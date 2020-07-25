import { PostService } from '../../post.service';
import { IPost } from '../../Models/Post';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']

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
