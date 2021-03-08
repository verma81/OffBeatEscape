/**
 * Angular modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyHttpInterceptorService } from './commonservices/MyHttpInterceptorService';
import { AuthGuardService } from './commonservices/AuthGuardService';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * Angular Material Modules
 */
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { PostHeadingComponent } from './post-heading/post-heading.component';

/**
 * Services
 */
import { TokenService } from './commonservices/TokenService';
import { LogInService } from './login/login.service';
import { PasswordValidatorDirective } from './signup/passwordvalidator.directive';

/**
 * 3rd party modules
*/
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ParticlesModule } from 'angular-particle';
import { FriendslistComponent } from './friendslist/friendslist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    PasswordValidatorDirective,
    PostHeadingComponent,
    FriendslistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatDividerModule,
    ParticlesModule
  ],
  providers: [
    LogInService,
    AuthGuardService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
