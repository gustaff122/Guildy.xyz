import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import { WorkersComponent } from './shared/workers/workers.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpEasyManagerInterceptor } from './core/interceptors/http.interceptor';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './shared/store/user.state';
import { InitialsPipe } from './core/pipes/initials.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    InitialsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpEasyManagerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
