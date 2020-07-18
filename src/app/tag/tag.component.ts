import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public tagname:string;

  constructor(private route: ActivatedRoute,private _postService:PostService) {
              
    this.route.paramMap.subscribe(params => {
      this.tagname = params.get('tagname');
      });
              
  }

  ngOnInit(): void {
    console.log("tagname:"+this.tagname);
  }

}
