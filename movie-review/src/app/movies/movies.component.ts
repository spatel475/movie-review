import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Movie } from '../models/movie';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
	movies = this.store.collection('movies').valueChanges({ idField: 'id' }) as Observable<Movie[]>;

	constructor(private store: AngularFirestore, private authService: AuthService) { }


	columnDefs: ColDef[] = [
		{ field: 'title', sortable: true },
		{ field: 'description', sortable: true },
		{ field: 'genre', sortable: true },
	];
	gridOptions: GridOptions = {}
	gridApi: GridApi;

	onGridReady(e: GridReadyEvent) {
		this.gridApi = e.api;
		this.gridOptions.columnApi = e.columnApi;
	}
}
