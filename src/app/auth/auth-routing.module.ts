import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InverseAuthGuard } from './inverse-auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'login', component: LoginComponent, canActivate: [ InverseAuthGuard ]},
      {path: 'regist', component: RegistComponent, canActivate: [ InverseAuthGuard ]}
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
