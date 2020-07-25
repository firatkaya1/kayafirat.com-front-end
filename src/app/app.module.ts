import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './Components/posts/posts.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ArticleComponent } from './Components/article/article.component';
import { CategoryComponent } from './Components/category/category.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServererrorComponent } from './servererror/servererror.component';
import { AuthorationerrorComponent } from './authorationerror/authorationerror.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { MenuComponent } from './Components/menu/menu.component';
import { ConfirmaccountComponent } from './Components/confirmaccount/confirmaccount.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SearchtagComponent } from './Components/searchtag/searchtag.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    WelcomeComponent,
    SearchBarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProfileComponent,
    ArticleComponent,
    CategoryComponent,
    NotfoundComponent,
    ServererrorComponent,
    AuthorationerrorComponent,
    SettingsComponent,
    MenuComponent,
    ConfirmaccountComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    SearchtagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule, 
    RecaptchaFormsModule 
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
