import { CSRFInterceptor }                                from './Core/Interceptor/CSRFInterceptor';
import { HttpInterceptorService }                         from './Core/Interceptor/HttpInterceptor';
import { ErrorInterceptor }                               from './Core/Interceptor/ErrorInterceptor';
import { ServererrorComponent }                           from './Components/Errors/servererror/servererror.component';
import { ResetpasswordComponent }                         from './Components/User/resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule }               from '@angular/forms';
import { BrowserModule }                                  from '@angular/platform-browser';
import { NgModule }                                       from '@angular/core';
import {CookieService}                                    from 'ngx-cookie-service';
import { HttpClient ,HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule }          from 'ng-recaptcha';
import {NgxSpinnerModule}                                 from "ngx-spinner";
import {TranslateLoader, TranslateModule}                 from '@ngx-translate/core';
import {TranslateHttpLoader}                              from '@ngx-translate/http-loader';



import { AppRoutingModule }             from './Core/Routing/app-routing.module';
import { AppComponent }                 from './app.component';
import { PostsComponent }               from './Components/Blog/posts/posts.component';
import { MainComponent }                from './Components/Blog/main/main.component';
import { SearchBarComponent }           from './Components/Blog/search-bar/search-bar.component';
import { LoginComponent }               from './Components/Authenticate/login/login.component';
import { RegisterComponent }            from './Components/Authenticate/register/register.component';
import { FooterComponent }              from './Components/Blog/footer/footer.component';
import { ProfileComponent }             from './Components/User/profile/profile.component';
import { ArticleComponent }             from './Components/Blog/article/article.component';
import { CategoryComponent }            from './Components/Blog/category/category.component';
import { SettingsComponent }            from './Components/User/settings/settings.component';
import { MenuComponent }                from './Components/Blog/menu/menu.component';
import { ConfirmaccountComponent }      from './Components/User/confirmaccount/confirmaccount.component';
import { ForgotpasswordComponent }      from './Components/User/forgotpassword/forgotpassword.component';
import { SearchtagComponent }           from './Components/Blog/searchtag/searchtag.component';
import { AuthenticationerrorComponent } from './Components/Errors/authenticationerror/authenticationerror.component';
import { NotfounderrorComponent }       from './Components/Errors/notfounderror/notfounderror.component';
import { GithubComponent }              from './Components/Oauth2/github/github.component';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { LinkedinComponent }            from './Components/Oauth2/linkedin/linkedin.component';
import { ServiceWorkerModule }          from '@angular/service-worker';
import { environment }                  from '../environments/environment';
import { CookieComponent } from './Components/Blog/cookie/cookie.component';



@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    MainComponent,
    SearchBarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProfileComponent,
    ArticleComponent,
    CategoryComponent,
    ServererrorComponent,
    SettingsComponent,
    MenuComponent,
    ConfirmaccountComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    SearchtagComponent,
    AuthenticationerrorComponent,
    NotfounderrorComponent,
    GithubComponent,
    LinkedinComponent,
    CookieComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule, 
    RecaptchaFormsModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production,registrationStrategy: "registerImmediately" })
 
  ],
  providers: [CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
