import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { passwordMatchValidator } from 'src/app/utils/password-match-validator';
import { CommonRoutes } from 'src/app/utils/routes';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	userLoginForm: FormGroup;

	constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

	ngOnInit(): void {
		this.createForm();
	}

	private createForm() {
		this.userLoginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
		});
	}

	togglePasswordVisibility(id: string) {
		let x = document.getElementById(id) as HTMLInputElement;
		(x.type === "password") ? x.type = "text" : x.type = "password";
	}

	isFormValid() {
		return this.userLoginForm.valid;
	}

	forgotPassword() {
		this.router.navigateByUrl(CommonRoutes.ForgotPassword);
	}

	register() {
		this.router.navigateByUrl(CommonRoutes.Register);
	}

	login() {
		this.authService.login(this.userLoginForm.value)
			.then(x => this.router.navigateByUrl(CommonRoutes.Home))
			.catch(err => this.toast.error(err.message, 'Error'))
	}
}
