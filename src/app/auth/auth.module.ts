import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserResolver } from './user.resolver';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegistComponent
  ],
  providers: [
    UserResolver,
    AuthService
  ]
})
export class AuthModule { }
