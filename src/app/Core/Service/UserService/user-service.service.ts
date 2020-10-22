import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser }                   from './../../Model/User';
import { FormGroup }               from '@angular/forms';
import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private BASE_URL = "http://localhost:8080";
  private urlUserByUsername:string = this.BASE_URL+"/v1/user?username=";
  private addUserUrl:string = this.BASE_URL+"/v1/user/register";
  private sendEmail:string = this.BASE_URL+"/v1/mail";
  private verifyUser:string = this.BASE_URL+"/v1/mail/verify";
  private validaterecaptcha:string = this.BASE_URL+"/v1/recaptcha";
  private searchURL:string = this.BASE_URL+"/v1/post/search?";
  private updatePassword:string = this.BASE_URL+"/v1/mail/reset"
  private updateUserPermission:string = this.BASE_URL+"/v1/user/permissions";
  private updateUser:string = this.BASE_URL+"/v1/user/update";
  private updateProfilPhoto:string = this.BASE_URL+"/v1/user/photo";
  private userPhoto:string = this.BASE_URL+"/v1/user/photo";

  private forgotUserPasswordURI:string = this.BASE_URL+"/v1/mail/forgot";

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
  getUserPhoto(){
    return this.http.get(this.userPhoto);
    
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
    this.http.post<any>(this.forgotUserPasswordURI,body).subscribe(data => {})
  }
  updateUserVerification(email:string,id:string){
    let body = {
      id:id,
      email:email
    }
      this.http.post<any>(this.verifyUser,body).subscribe(data => {})
  }
  updateUserPassword(userid:string,password:string,ipaddress:string,useragent:string){
    let body = {
      userid:userid,
      password : password,
      ipaddress:ipaddress,
      useragent:useragent 
    }
    this.http.post<any>(this.updatePassword,body).subscribe(data => {})

  }
  forgotUserPassword(email:string,userid:string,password:string,ipaddress:string,useragent:string){
    let body = {
      email:email,
      userid:userid,
      password : password,
      ipaddress:ipaddress,
      useragent:useragent 
    }
    this.http.post<any>(this.forgotUserPasswordURI,body).subscribe(data => {})

  }
  updateUserPermissions(body){
    this.http.put<any>(this.updateUserPermission,body).subscribe(data => {})

  }
  updateUserGithubAddress(githubaddress:string){
    let body = {
      key:"github",
      githubaddress:githubaddress
    }
    this.http.put<any>(this.updateUser,body).subscribe(data => {})
  }
  updateUserLinkedinAddress(linkedinaddress:string){
    let body = {
      key:"linkedin",
      linkedinaddress:linkedinaddress
    }
    this.http.put<any>(this.updateUser,body).subscribe(date => {})

  }
  updateUserBirthDate(birthdate:string){
    let body = {
      key:"birthdate",
      birthdate:birthdate
    }
    this.http.put<any>(this.updateUser,body).subscribe(date => {})
  }
  updateUserName(username:string){
    let body = {
      key:"username",
      username:username
    }
    this.http.put<any>(this.updateUser,body).subscribe(date => {})

  }
  updateUserProfilPhoto(profilphoto:File){
    let headers = new HttpHeaders({
      'photo' : '' });
    let options = { headers: headers };
    let formData = new FormData();
    formData.append('file', profilphoto);
    return this.http.post<any>(this.updateProfilPhoto,formData,options);

  }
  validateReCaptcha(response:string) {

    let headers = new HttpHeaders({
      'skip' : ''});
    let options = { headers: headers };

     return this.http.post<any>(this.validaterecaptcha,{key:response},options);
      
  }
  getIpAddress(){
    let headers = new HttpHeaders({
      'ipAddress' : '' });
    let options = { headers: headers };
    return this.http.get<string>("https://www.cloudflare.com/cdn-cgi/trace",options);
  }
}
