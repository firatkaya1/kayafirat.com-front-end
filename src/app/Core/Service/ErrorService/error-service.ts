import { FormGroup }  from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private BASE_URL = "https://api.kayafirat.com/firatkaya-0.0.1";

  private addErrorURI = this.BASE_URL+"/v1/error";

  constructor(private http:HttpClient) { }

  addError(errorDetail:FormGroup,code:number,captcha:string){
    let body = {
      errorCode : code,
      email : errorDetail.controls['emailAddress'].value,
      errorMessage : errorDetail.controls['message'].value
    }
    return this.http.post(this.addErrorURI.concat("?captcha=").concat(captcha),body);
  }
 
}
