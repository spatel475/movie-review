import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	user: LoginUser = {
		email: '',
		password: ''
	};

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	login() {
		this.authService.login(this.user).then(x => this.router.navigateByUrl(''))
	}
}
