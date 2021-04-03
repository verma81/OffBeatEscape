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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { PostHeadingComponent } from './post-heading/post-heading.component';
import { HeaderComponent } from './header/header.component';
import { AddpostComponent } from './addpost/addpost.component';
import { MypostsComponent } from './myposts/myposts.component';
import { FriendslistComponent } from './friendslist/friendslist.component';
import { EditpostComponent } from './editpost/editpost.component';
import { SettingsComponent } from './settings/settings.component';

/**
 * Services
 */
import { LogInService } from './login/login.service';
import { PasswordValidatorDirective } from './signup/passwordvalidator.directive';
import { FriendListPipe } from './friendslist/friendlist.pipe';
import { DashBoardService } from './dashboard/dashboard.service';
import { PostHeadingService } from './post-heading/post-heading.service';

/**
 * 3rd party modules
*/
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ParticlesModule } from 'angular-particle';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    PasswordValidatorDirective,
    PostHeadingComponent,
    FriendListPipe,
    FriendslistComponent,
    HeaderComponent,
    AddpostComponent,
    MypostsComponent,
    EditpostComponent,
    SettingsComponent
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
    ParticlesModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    LogInService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptorService,
      multi: true
    },
    DashBoardService,
    PostHeadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
