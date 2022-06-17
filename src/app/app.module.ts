import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthRoutingModule } from './pages/auth/auth-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './shared/store/user.state';

import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SimpleModalModule } from 'ngx-simple-modal';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState], {
      developmentMode: !environment.production,
    }),
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 2
    }),
    SimpleModalModule,
    SimpleModalModule.forRoot({container: document.body}),
    SharedModule
  ],

  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
