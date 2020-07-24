import { IUserPermissions } from './Models/UserPermissions';
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
  private urlUserByUsername:string = "http://localhost:8080/api/v1/user/username/";
  private addUserUrl:string = "http://localhost:8080/api/v1/user/register";

  private sendEmail:string = "http://localhost:8080/api/v1/user/sendemail/";

  private sendResetPassEmail:string = "http://localhost:8080/api/v1/user/sendResetEmail";
  private verifyUser:string = "http://localhost:8080/api/v1/user/verification";
  private validaterecaptcha:string = "http://localhost:8080/api/v1/user/validaterecaptcha/";
  private searchURL:string = "http://localhost:8080/api/v1/post/search/";

  private updatePassword:string = "http://localhost:8080/api/v1/user/reset/"

  private updateUserPermission:string = "http://localhost:8080/api/v1/user/update/userpermissions/";
  private updateUser:string = "http://localhost:8080/api/v1/user/update";
  private updateProfilPhoto:string = "http://localhost:8080/api/v1/user/updatepicture/";


  constructor(private http:HttpClient) { }

  getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.myUrl);
  }
  getUserByUsername(username:string): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.urlUserByUsername.concat(username)).pipe(catchError(this.errorHandler));
  }
  getSearchs(word:string,pageNumber:string,pageSize:string,sortedName:string,orderby:string) {
    return this.http.get<string[]>(this.searchURL.concat(word).concat("/").concat(pageNumber).concat("/")
    .concat(pageSize).concat("/sorted/").concat(sortedName).concat("/orderby/").concat(orderby));
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
    let body = {
      email:email
    }
    this.http.post<any>(this.sendEmail,body).subscribe(data => {})
  }
  sendResetPasswordEmail(emailAddress:string){  
    let body = {
      email : emailAddress
    };
    this.http.post<any>(this.sendResetPassEmail,body).subscribe(data => {})
  }

  updateUserVerification(email:string,id:string){
    let body = {
      email:email,
      id:id
    }
      this.http.post<any>(this.verifyUser,body).subscribe(data => {})
  }
  updateUserPassword(emailAddress:string,password:string){
    let body = {
      email : emailAddress,
      password : password
    }
    this.http.post<any>(this.updatePassword,body).subscribe(data => {})

  }
  updateUserPermissions(username:string,body){
    this.http.put<any>(this.updateUserPermission.concat(username),body).subscribe(data => {})

  }
  updateUserGithubAddress(email:string,githubaddress:string){
    let body = {
      key:"githubaddress",
      email:email,
      githubaddress:githubaddress
    }
    this.http.put<any>(this.updateUser,body).subscribe(data => {})
  }
  updateUserLinkedinAddress(email:string,linkedinaddress:string){
    let body = {
      key:"linkedinaddress",
      email:email,
      linkedinaddress:linkedinaddress
    }
    this.http.put<any>(this.updateUser,body).subscribe(date => {})

  }
  updateUserBirthDate(email:string,birthdate:string){
    let body = {
      key:"birthdate",
      email:email,
      birthdate:birthdate
    }
    this.http.put<any>(this.updateUser,body).subscribe(date => {})
  }
  updateUserName(email:string,username:string){
    let body = {
      key:"username",
      email:email,
      username:username
    }
    this.http.put<any>(this.updateUser,body).subscribe(date => {})

  }

  updateUserProfilPhoto(userId:string,profilphoto:File  ){
    const formData = new FormData();
    formData.append('file', profilphoto);
    this.http.post<any>(this.updateProfilPhoto.concat(userId),formData).subscribe(date => {})

  }







  validateReCaptcha(response:string) {
     return this.http.get<string>(this.validaterecaptcha.concat(response));
      
  }
  


}
