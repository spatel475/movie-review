import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
			} else {
				localStorage.setItem(LocalStorageKeys.User, null);
			}
		});
	}

	async login(user: LoginUser) {
		let result = await this.auth.signInWithEmailAndPassword(user.email, user.password)
		this.router.navigate(['']);
	}

	async register(user: LoginUser) {
		let result = await this.auth.createUserWithEmailAndPassword(user.email, user.password)
		this.sendEmailVerification();
	}

	async sendEmailVerification() {
		await (await this.auth.currentUser).sendEmailVerification();
		this.router.navigate(['verify-email']);
	}

	async sendPasswordResetEmail(passwordResetEmail: string) {
		return await this.auth.sendPasswordResetEmail(passwordResetEmail);
	}

	async logout() {
		await this.auth.signOut();
		localStorage.removeItem(LocalStorageKeys.User);
		this.router.navigate(['login']);
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
		return user !== null;
	}
}
