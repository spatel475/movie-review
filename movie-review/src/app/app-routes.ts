import { Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { MoviesComponent } from './movies/movies.component';

export const AppRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'verify-email', component: VerifyEmailComponent },
	{
		path: '',
		component: MoviesComponent,
		canActivate: [AppGuard]
	},
	{ path: '**', redirectTo: '' },
];