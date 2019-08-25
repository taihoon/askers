import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserResolver } from './user.resolver';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '../../app/modules/auth/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    UserResolver
  ]
})
export class AuthModule { }
