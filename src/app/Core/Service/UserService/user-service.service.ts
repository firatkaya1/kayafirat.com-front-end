import { IUser } from './../../Model/User';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private BASE_URL = "http://localhost:8080";
  private urlUserByUsername:string = this.BASE_URL+"/v1/user?username=";
  private addUserUrl:string = this.BASE_URL+"/v1/user/register";
  private sendEmail:string = this.BASE_URL+"/v1/mail";
  private sendResetPassEmail:string = this.BASE_URL+"/v1/mail/reset";
  private verifyUser:string = this.BASE_URL+"/v1/mail/verify";
  private validaterecaptcha:string = this.BASE_URL+"/v1/recaptcha";
  private searchURL:string = this.BASE_URL+"/v1/post/search?";
  private updatePassword:string = this.BASE_URL+"/v1/user/reset/"
  private updateUserPermission:string = this.BASE_URL+"/v1/user/permissions";
  private updateUser:string = this.BASE_URL+"/v1/user/update";
  private updateProfilPhoto:string = this.BASE_URL+"/v1/user/photo/";
  private userPhoto:string = this.BASE_URL+"/v1/user/email/photo";

  constructor(private http:HttpClient) { }

  getUser(username:string): Observable<IUser> {

    return this.http.get<IUser>(this.urlUserByUsername.concat(username));
  }

  getUserByUsername(username:string): Observable<IUser[]> {

    return this.http.get<IUser[]>(this.urlUserByUsername.concat(username));
  }
  getSearchs(word:string,pageNumber:string,pageSize:string,sortedName:string,orderby:string) {
    let query = "keyword="+word+"&page="+pageNumber+"&size="+pageSize+"&sort="+sortedName+"&order="+orderby;
    return this.http.get<string[]>(this.searchURL.concat(query));
  }
  getUserPhoto(email:string){
    return this.http.post<string[]>(this.userPhoto,{email:email});
    
  }
  setUser(registerForm:FormGroup){
    const body = 
    { 
          userEmail: registerForm.controls['emailAddress'].value,
          userName: registerForm.controls['username'].value,
          userPassword: registerForm.controls['password'].value,
          userBirthdayDate: registerForm.controls['birthdate'].value,
          userProfilePhoto:"assets/images/profile.svg"
    };
   return this.http.post(this.addUserUrl,body);
      
  }
  sendVerificationEmail(email:string){
    let headers = new HttpHeaders({
      'skip' : '' });
    let options = { headers: headers };
    let body = {
      email:email
    }
    this.http.post<any>(this.sendEmail,body,options).subscribe(data => {})
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
  updateUserPassword(emailAddress:string,userid:string,password:string,ipaddress:string,useragent:string){
    let body = {
      email : emailAddress,
      userid:userid,
      password : password,
      ipaddress:ipaddress,
      useragent:useragent 
    }
    this.http.post<any>(this.updatePassword,body).subscribe(data => {})

  }
  updateUserPermissions(body){
    this.http.put<any>(this.updateUserPermission,body).subscribe(data => {})

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

  updateUserProfilPhoto(userId:string,profilphoto:File){
    let headers = new HttpHeaders({
      'photo' : '' });
    let options = { headers: headers };
    let formData = new FormData();
    formData.append('file', profilphoto);
    this.http.post<any>(this.updateProfilPhoto.concat(userId),formData,options).subscribe(data => {})

  }
  validateReCaptcha(response:string) {

    let headers = new HttpHeaders({
      'skip' : ''});
    let options = { headers: headers };

     return this.http.post<any>(this.validaterecaptcha,{key:response},options);
      
  }
  getIpAddress(){
    let headers = new HttpHeaders({
      'skip' : '' });
    let options = { headers: headers };
    return this.http.get<string>("https://cors-anywhere.herokuapp.com/http:/.ipify.org/?format=json",options);
  }
  


}
