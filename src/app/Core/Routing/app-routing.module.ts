import { SearchtagComponent }           from './../../Components/Blog/searchtag/searchtag.component';
import { SearchBarComponent }           from './../../Components/Blog/search-bar/search-bar.component';
import { ArticleComponent }             from './../../Components/Blog/article/article.component';
import { CategoryComponent }            from './../../Components/Blog/category/category.component';
import { MainComponent }                from './../../Components/Blog/main/main.component';
import { AuthenticationerrorComponent } from './../../Components/Errors/authenticationerror/authenticationerror.component';
import { ForgotpasswordComponent }      from './../../Components/User/forgotpassword/forgotpassword.component';
import { ConfirmaccountComponent }      from './../../Components/User/confirmaccount/confirmaccount.component';
import { ResetpasswordComponent }       from './../../Components/User/resetpassword/resetpassword.component';
import { NotfounderrorComponent }       from './../../Components/Errors/notfounderror/notfounderror.component';
import { ServererrorComponent }         from './../../Components/Errors/servererror/servererror.component';
import { Routes, RouterModule }         from '@angular/router';
import { LinkedinComponent }            from './../../Components/Oauth2/linkedin/linkedin.component';
import { SettingsComponent }            from './../../Components/User/settings/settings.component';
import { GithubComponent }              from './../../Components/Oauth2/github/github.component';
import { RegisterComponent }            from '../../Components/Authenticate/register/register.component';
import { ProfileComponent }             from './../../Components/User/profile/profile.component';
import { LoginComponent }               from './../../Components/Authenticate/login/login.component';
import { NgModule }                     from '@angular/core';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent },
  {path:'article',redirectTo:'404',pathMatch: 'full' },
  {path:'article/:postTitle',component:ArticleComponent },
  {path:'profile',redirectTo:'404',pathMatch: 'full'  },
  {path:'profile/:username',component:ProfileComponent },
  {path:'search',redirectTo:'search/1',pathMatch: 'full' },
  {path:'search/:pagenumber',component:SearchBarComponent },
  {path:'category',redirectTo:'category/1',pathMatch: 'full' },
  {path:'category/:pagenumber',component:CategoryComponent },
  {path:'category/orderby/tag',redirectTo:'404',pathMatch: 'full' },
  {path:'category/orderby/tag/:tagname',component:SearchtagComponent },
  {path:'settings',redirectTo:'404',pathMatch: 'full' },
  {path:'settings/:username',component:SettingsComponent, },
  {path:'confirm',redirectTo:'403',pathMatch: 'full' },
  {path:'confirm/:token',component:ConfirmaccountComponent },
  {path:'forgotpassword',component:ForgotpasswordComponent },
  {path:'forgotpassword/reset',redirectTo:'404',pathMatch: 'full' },
  {path:'forgotpassword/reset/:token',component:ResetpasswordComponent },
  {path:'login/auth/github',component:GithubComponent},
  {path:'login/auth/linkedin',component:LinkedinComponent},
  {path:'404',component:NotfounderrorComponent },
  {path:'500',component:ServererrorComponent },
  {path:'403',component: AuthenticationerrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
