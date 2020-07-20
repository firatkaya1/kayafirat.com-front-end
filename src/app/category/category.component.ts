import { IPost } from './../Models/Post';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public pagenumber:string;
  public selectedPageSize:string = "10";
  public selectedOrderBy:string;
  public selectedOrderType:string;
  public postInfo:IPost[];
  public pages:Array<number>;
  public orderSuccess:boolean;


  constructor(private route: ActivatedRoute,private _postService:PostService) {
    
    this.route.paramMap.subscribe(params => {
      this.pagenumber = params.get('pagenumber');
      this.selectedOrderBy="post_Time";
      this.selectedOrderType="desc";
      this.orderSuccess = false;
      
      });
   }
   setPage(i){
    this.pagenumber=i+1;
    this.orderBy();
  }

  ngOnInit(): void {

    this._postService.getPostOrderBy(this.pagenumber,this.selectedPageSize,this.selectedOrderBy,this.selectedOrderType).subscribe(
      res => {
        this.postInfo = res['content'];
        this.pages = new Array(res['totalPages']);
      });
  }
  ngOnChange(val:string):void {
    this.selectedPageSize = val;

  }
  ngOnChangeOrderBy(val:string):void {
    this.selectedOrderBy=val.split("-")[0];
    this.selectedOrderType=val.split("-")[1];
  }
  orderBy(){
    this._postService.getPostOrderBy(this.pagenumber,this.selectedPageSize,this.selectedOrderBy,this.selectedOrderType).subscribe(
      res => {
        this.postInfo = res['content'];
        this.pages = new Array(res['totalPages']);
        this.orderSuccess=true;
      });
      setTimeout(() => { this.orderSuccess=false;
      }, 3000);
  }
  enChangeLink(str:string):string{
    return str.replace(/\s+/g,'-');
  }

}
