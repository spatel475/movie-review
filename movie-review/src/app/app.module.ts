import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { MoviesComponent } from './movies/movies.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [AppComponent, MoviesComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(AppRoutes),
		BrowserAnimationsModule,
		MaterialModule,
		AgGridModule.withComponents([]),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
