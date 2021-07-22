import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginUser } from '../models/login-user';
import { User } from '../models/user';
import { LocalStorageKeys } from '../utils/local-storage-keys';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user: User;

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
		return Promise.all([
			this.auth.createUserWithEmailAndPassword(user.email, user.password),
			this.sendEmailVerification()
		]);
	}

	async logout(): Promise<void> {
		await this.auth.signOut();
		localStorage.removeItem(LocalStorageKeys.User);
		this.router.navigate(['login']);
	}

	async sendEmailVerification(): Promise<void> {
		await (await this.auth.currentUser).sendEmailVerification();
		this.router.navigate(['verify-email']);
	}

	async sendPasswordResetEmail(passwordResetEmail: string): Promise<void> {
		await this.auth.sendPasswordResetEmail(passwordResetEmail);
	}


	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
		return user !== null;
	}
}
