import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { environment } from '../environments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { ChannelModule } from '@app/modules/channel/channel.module';
import { SharedModule} from '@app/shared/shared.module';
import { AppInitService } from '@app/core/app-init.service';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/modules/home/home.component';

export function init(appInitService: AppInitService) {
  return () => appInitService.init();
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'web'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    ChannelModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    AngularFireAuthGuard,
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: init, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
