import { CSRFInterceptor } from './Core/interceptor/CSRFInterceptor';
import { HttpInterceptorService } from './Core/interceptor/httpInterceptor';
import { ErrorInterceptor } from './Core/interceptor/ErrorInterceptor';
import { ServererrorComponent } from './Components/servererror/servererror.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient ,HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {NgxSpinnerModule} from "ngx-spinner";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';



import { AppRoutingModule } from './Core/Routing/app-routing.module';
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
import { SettingsComponent } from './Components/settings/settings.component';
import { MenuComponent } from './Components/menu/menu.component';
import { ConfirmaccountComponent } from './Components/confirmaccount/confirmaccount.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { SearchtagComponent } from './Components/searchtag/searchtag.component';
import { AuthenticationerrorComponent } from './Components/authenticationerror/authenticationerror.component';
import { NotfounderrorComponent } from './Components/notfounderror/notfounderror.component';
import { GithubComponent } from './Components/github/github.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkedinComponent } from './Components/linkedin/linkedin.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



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
    LinkedinComponent
  ],
  imports: [
    BrowserModule,
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
