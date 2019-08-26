import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AppRoutingModule } from '@app/app-routing.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { ChannelModule } from '@app/modules/channel/channel.module';
import { AppComponent } from '@app/app.component';

import { AppInitService } from '@app/core/app-init.service';
import { HomeComponent } from '@app/modules/home/home.component';
import { environment } from '../environments/environment';

export function init(appInitService: AppInitService) {
  return () => appInitService.init();
}

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'web'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    ChannelModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    AngularFireAuthGuard,
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: init, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
