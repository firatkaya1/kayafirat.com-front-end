import { AuthenticationerrorComponent } from '../../Components/authenticationerror/authenticationerror.component';
import { ForgotpasswordComponent }      from '../../Components/forgotpassword/forgotpassword.component';
import { ConfirmaccountComponent }      from '../../Components/confirmaccount/confirmaccount.component';
import { ResetpasswordComponent }       from '../../Components/resetpassword/resetpassword.component';
import { NotfounderrorComponent }       from '../../Components/notfounderror/notfounderror.component';
import { ServererrorComponent }         from './../../Components/servererror/servererror.component';
import { Routes, RouterModule }         from '@angular/router';
import { SearchtagComponent }           from '../../Components/searchtag/searchtag.component';
import { SearchBarComponent }           from '../../Components/search-bar/search-bar.component';
import { LinkedinComponent }            from './../../Components/linkedin/linkedin.component';
import { SettingsComponent }            from '../../Components/settings/settings.component';
import { GithubComponent }              from './../../Components/github/github.component';
import { ArticleComponent }             from '../../Components/article/article.component';
import { CategoryComponent }            from '../../Components/category/category.component';
import { RegisterComponent }            from '../../Components/register/register.component';
import { ProfileComponent }             from '../../Components/profile/profile.component';
import { WelcomeComponent }             from '../../Components/welcome/welcome.component';
import { LoginComponent }               from './../../Components/login/login.component';
import { NgModule }                     from '@angular/core';

const routes: Routes = [
  {path:'',component:WelcomeComponent},
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
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
