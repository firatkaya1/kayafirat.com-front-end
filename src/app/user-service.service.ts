import { FormGroup } from '@angular/forms';
import { IUser } from './Models/User';
import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private myUrl:string = "http://localhost:8080/api/v1/user";
  private urlUserById:string = "http://localhost:8080/api/v1/user/userid/";
  private addUserUrl:string = "http://localhost:8080/api/v1/user/register";
  private sendEmail:string = "http://localhost:8080/api/v1/user/sendemail/";
  private sendResetPassEmail:string = "http://localhost:8080/api/v1/user/sendResetEmail/";
  private verifyUser:string = "http://localhost:8080/api/v1/user/verification/";
  private validaterecaptcha:string = "http://localhost:8080/api/v1/user/validaterecaptcha/";
  private searchURL:string = "http://localhost:8080/api/v1/post/search/";
  private updatePassword:string = "http://localhost:8080/api/v1/user/reset/"

  constructor(private http:HttpClient) { }

  getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.myUrl);
  }

  getUserById(userid:string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.urlUserById.concat(userid)).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error."+error.status);
}

    setUser(registerForm:FormGroup){
      //this.form.controls['your form control name'].value
      const body = 
      { 
            userEmail: registerForm.controls['emailAddress'].value,
            userName: registerForm.controls['username'].value,
            userPassword: registerForm.controls['password'].value,
            userBirthdayDate: registerForm.controls['birthdate'].value
      };
      this.http.post<Comment>(this.addUserUrl,body).subscribe(data => {})
    }
    sendVerificationEmail(email:string){
      this.http.post<any>(this.sendEmail.concat(email),'').subscribe(data => {})
    }
    sendResetPasswordEmail(email:string){
      this.http.post<any>(this.sendResetPassEmail.concat(email),'').subscribe(data => {})
    }
    updateUserVerification(email:string,id:string){
        this.http.post<any>(this.verifyUser.concat(email).concat("/").concat(id),'').subscribe(data => {})
    }

    updateUserPassword(email:string,password:string){
      this.http.post<any>(this.updatePassword.concat(email).concat("/").concat(password),'').subscribe(data => {})

    }

    validateReCaptcha(response:string) {
     return this.http.get<string>(this.validaterecaptcha.concat(response));
      
  }

  getSearchs(word:string,pageNumber:string,pageSize:string,sortedName:string,orderby:string) {
    return this.http.get<string[]>(this.searchURL.concat(word).concat("/").concat(pageNumber).concat("/")
    .concat(pageSize).concat("/sorted/").concat(sortedName).concat("/orderby/").concat(orderby));
  }


}
