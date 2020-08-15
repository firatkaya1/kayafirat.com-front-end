import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: []
})
export class SearchBarComponent implements OnInit {

  public searchResult:string[];
  public searchWord:string="";
  public searchSuccess:boolean;

  public pagenumber:string;
  public selectedPageSize:string = "10";
  public selectedOrderBy:string;
  public selectedOrderType:string;
  public maxResult:string;
  public pages:Array<number>;

  constructor(private _userService:UserServiceService,private router:Router,private route: ActivatedRoute) { 

    this.route.paramMap.subscribe(params => {
      this.pagenumber = params.get('pagenumber');
      this.selectedOrderBy="post_time";
      this.selectedOrderType="desc";
      
      
      });
  }

  ngOnInit(): void {
  }

  redirect(link:string){
    this.router.navigateByUrl('/article/'+link.replace(/\s+/g,'-'));
  }
  setPage(i){
    this.pagenumber=i+1;
    this.getSearch();
  }

  getSearch(){
    if(this.searchWord.length > 0) {
     this.searchWord = this.searchWord.replace(/\s*$/, "");
      this._userService.getSearchs(this.searchWord,this.pagenumber,this.selectedPageSize,this.selectedOrderBy,this.selectedOrderType).subscribe(
        res => { 
        this.searchResult = res['content'];
        this.pages = new Array(res['totalPages']);
        this.maxResult = res['totalElements'];
      });
    } 

  }



}
