import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { NotfounderrorComponent } from './Components/notfounderror/notfounderror.component';
import { AuthenticationerrorComponent } from './Components/authenticationerror/authenticationerror.component';
import { SearchtagComponent } from './Components/searchtag/searchtag.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { ConfirmaccountComponent } from './Components/confirmaccount/confirmaccount.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { ServererrorComponent } from './servererror/servererror.component';
import { ArticleComponent } from './Components/article/article.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CategoryComponent } from './Components/category/category.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
