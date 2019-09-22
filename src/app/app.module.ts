import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { environment } from '../environments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { ChannelModule } from '@app/modules/channel/channel.module';
import { PostModule } from '@app/modules/post/post.module';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/modules/home/home.component';

import { first } from 'rxjs/operators';

export function init(afAuth: AngularFireAuth) {
  return () => {
    return afAuth.user.pipe(first());
  };
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'web'),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    ChannelModule,
    PostModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: init, deps: [AngularFireAuth], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
