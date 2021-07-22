import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(
		private breakpointObserver: BreakpointObserver,
		private authService: AuthService,
	) { }

	ngOnInit(): void { }

	@ViewChild('drawer') drawer: MatDrawer;
	public selectedItem: string = '';
	public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(() => true));

	closeSideNav() {
		if (this.drawer.mode == 'over') {
			this.drawer.close();
		}
	}

	logout() {
		this.authService.logout();
	}
}
