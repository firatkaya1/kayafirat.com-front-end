import { ConfirmaccountComponent } from './confirmaccount/confirmaccount.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthorationerrorComponent } from './authorationerror/authorationerror.component';
import { ServererrorComponent } from './servererror/servererror.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent },
  {path:'article',redirectTo:'404',pathMatch: 'full' },
  {path:'article/:postTitle',component:ArticleComponent },
  {path:'profile',component:ProfileComponent },
  {path:'category',component:CategoryComponent },
  {path:'settings',redirectTo:'404',pathMatch: 'full' },
  {path:'settings/:username',component:SettingsComponent, },
  {path:'confirm',redirectTo:'403',pathMatch: 'full' },
  {path:'confirm/:token',component:ConfirmaccountComponent, },
  {path:'404',component:NotfoundComponent },
  {path:'500',component:ServererrorComponent },
  {path:'403',component:AuthorationerrorComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
