import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/login-user';
import { User } from 'src/app/models/user';
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

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	login() {
		this.authService.login(this.user)
	}
}
