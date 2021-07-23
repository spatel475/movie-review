import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { User } from 'src/app/models/user';
import { passwordMatchValidator } from 'src/app/utils/password-match-validator';
import { CommonRoutes } from 'src/app/utils/routes';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	user: User = {
		email: '',
		username: '',
		newPassword: ''
	};
	userRegisterForm: FormGroup;
	get password() { return this.userRegisterForm.get('password1'); }
	get password2() { return this.userRegisterForm.get('password2'); }

	constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

	ngOnInit(): void {
		this.createForm();
	}

	private createForm() {
		this.userRegisterForm = new FormGroup({
			usernameField: new FormControl('', Validators.required),
			emailField: new FormControl('', [Validators.required, Validators.email]),
			password1: new FormControl('', Validators.required),
			password2: new FormControl('', Validators.required),
		}, passwordMatchValidator);
	}


	/* Called on each input in either password field */
	onPasswordInput() {
		if (this.userRegisterForm.hasError('passwordMismatch'))
			this.password2.setErrors([{ 'passwordMismatch': true }]);
		else
			this.password2.setErrors(null);
	}

	routeToLogin() {
		this.router.navigateByUrl(CommonRoutes.Login);
	}

	onSubmit() {
		let user: LoginUser = {
			email: this.user.email,
			password: this.user.newPassword
		}
		this.authService.register(user)
			.then(x => this.router.navigateByUrl(CommonRoutes.Login))
			.catch(err => {
				this.toast.error(err.message, 'Error');
				console.warn(err);
			})
	}

	isFormValid() {
		return this.userRegisterForm.valid;
	}

	togglePasswordVisibility(id: string) {
		let x = document.getElementById(id) as HTMLInputElement;
		(x.type === "password") ? x.type = "text" : x.type = "password";
	}

}
