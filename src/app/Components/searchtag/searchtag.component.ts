import { IPost } from './../../Core/Model/Post';
import { PostService } from './../../Core/Service/PostService/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-searchtag',
  templateUrl: './searchtag.component.html',
  styles: [
  ]
})
export class SearchtagComponent implements OnInit {

  public tagname:string;
  public maxTag:number;
  public postInfo:IPost[];

  constructor(private route: ActivatedRoute,private _postService:PostService) {
              
    this.route.paramMap.subscribe(params => {
      this.tagname = params.get('tagname');
      });
              
  }

  ngOnInit(): void {
    this._postService.getPostByTag(this.tagname).subscribe(
      res => {
        this.postInfo = res;
        this.maxTag=res.length;
      });
  }

  enChangeLink(str:string):string{
    return str.replace(/\s+/g,'-');
  }

}
