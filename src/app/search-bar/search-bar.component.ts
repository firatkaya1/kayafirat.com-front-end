import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private _userService:UserServiceService,private router:Router) { }

  public searchResult:string[];
  public searchWord:string="";
  public searchSuccess:boolean;

  ngOnInit(): void {
  }

  redirect(link:string){
    this.router.navigateByUrl('/article/'+link.replace(/\s+/g,'-'));
  }


  getSearch(){
    if(this.searchWord.length > 0) {
      this._userService.getSearchs(this.searchWord).subscribe(data => { 
        this.searchResult = data;
        data.length > 0 ? this.searchSuccess=true : this.searchSuccess=false;
      });
    } else {
      this.searchSuccess = false;
    }
  }



}
