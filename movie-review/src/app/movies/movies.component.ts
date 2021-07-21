import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Movie } from '../models/movie';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {

	constructor(private store: AngularFirestore, private authService: AuthService) { }

	uniqueId = 1;
	title = 'Movie Review';
	movies = this.store
		.collection('movies')
		.valueChanges({ idField: 'id' }) as Observable<Movie[]>;

	addMovie() {
		let movie: Movie = {
			id: 'movie' + this.uniqueId,
			title: 'Movie ' + this.uniqueId,
			description: 'Test',
			genre: 'Action',
		};

		this.store
			.collection('movies')
			.add(movie)
			.then((x) => (this.uniqueId += 1));
	}

	logout() {
		this.authService.logout();
	}

	columnDefs: ColDef[] = [
		{ field: 'title', sortable: true },
		{ field: 'description', sortable: true },
		{ field: 'genre', sortable: true },
	];
}
