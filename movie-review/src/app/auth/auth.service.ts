import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginUser } from '../models/login-user';
import { LocalStorageKeys } from '../utils/local-storage-keys';
import { CommonRoutes } from '../utils/routes';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user;

	constructor(private auth: AngularFireAuth, private router: Router) {
		this.auth.authState.subscribe(user => {
			if (user) {
				this.user = user;
				localStorage.setItem(LocalStorageKeys.User, JSON.stringify(this.user));
				this.router.navigate(['']);
			} else {
				localStorage.setItem(LocalStorageKeys.User, null);
			}
		});
	}

	login(user: LoginUser): Promise<any> {
		return this.auth.signInWithEmailAndPassword(user.email, user.password);
	}

	register(user: LoginUser): Promise<any> {
		return this.auth.createUserWithEmailAndPassword(user.email, user.password);
	}

	async logout(): Promise<void> {
		await this.auth.signOut();
		localStorage.removeItem(LocalStorageKeys.User);
		this.router.navigate([CommonRoutes.Login]);
	}

	async sendEmailVerification(): Promise<void> {
		await (await this.auth.currentUser).sendEmailVerification();
		this.router.navigate([CommonRoutes.VerifyEmail]);
	}

	async sendPasswordResetEmail(passwordResetEmail: string): Promise<void> {
		await this.auth.sendPasswordResetEmail(passwordResetEmail);
	}


	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
		return user !== null;
	}
}
