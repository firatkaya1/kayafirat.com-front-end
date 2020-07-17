import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PosttagsComponent } from './posttags/posttags.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServererrorComponent } from './servererror/servererror.component';
import { AuthorationerrorComponent } from './authorationerror/authorationerror.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { ConfirmaccountComponent } from './confirmaccount/confirmaccount.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    WelcomeComponent,
    PosttagsComponent,
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
    ConfirmaccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
