import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
	providedIn: 'root'
})
export class MovieService {

	constructor(private store: AngularFirestore) { }

	createMovie(movie: Movie) {
		return this.store.collection<Movie>('movies').add(movie);
	}

	updateMovie(movie: Movie) {
		return this.store.doc<Movie>(`movies/${movie.id}`).update(movie);
	}

	deleteMovie(movieId: string) {
		return this.store.doc<Movie>(`movies/${movieId}`).delete();
	}

	getAllMovies(): Observable<Movie[]> {
		return this.store.collection<Movie>('movies').valueChanges({ idField: 'id' });
	}
}
