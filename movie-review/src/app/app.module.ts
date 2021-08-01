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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './ui/grid/grid.component';
import { ToastrModule } from 'ngx-toastr';
import { NewMovieComponent } from './movies/movie/movie.component';
import { RatingComponent } from './movies/ratings/rating/rating.component';
import { ConfirmPasswordComponent } from './auth/confirm-password/confirm-password.component';

@NgModule({
	declarations: [
		AppComponent,
		MoviesComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		VerifyEmailComponent,
		HomeComponent,
		GridComponent,
		NewMovieComponent,
		RatingComponent,
		ConfirmPasswordComponent
	],
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
		FormsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: 'toast-bottom-center',
			preventDuplicates: true,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
