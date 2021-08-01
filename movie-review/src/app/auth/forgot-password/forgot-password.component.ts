import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonRoutes } from 'src/app/utils/routes';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup;

	constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

	ngOnInit(): void {
		this.createForm();
	}

	private createForm() {
		this.forgotPasswordForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email])
		});
	}


	isFormValid() {
		return this.forgotPasswordForm.valid;
	}

	sendRequest() {
		this.authService.forgotPassword(this.forgotPasswordForm.value.email)
			.then(() => {
				this.router.navigateByUrl(CommonRoutes.Login);
				this.toast.info('Check email for reset link');
			})
			.catch((err) => {
				this.toast.error(err.message);
			});
	}
}
