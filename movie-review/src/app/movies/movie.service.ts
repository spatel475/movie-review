import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
	providedIn: 'root'
})
export class MovieService {

	constructor(private store: AngularFirestore) { }

	createMovie(movie: Movie): Promise<void> {
		return this.store.collection<Movie>('movies').doc(movie.title.replace(" ", "_").toLowerCase()).set(movie);
	}

	updateMovie(movie: Movie): Promise<void> {
		return this.store.doc<Movie>(`movies/${movie.id}`).update({
			id: movie.title.replace(" ", "_").toLowerCase(), // id should change if movie name changes
			avgRating: movie.avgRating,
			title: movie.title,
			description: movie.description,
			genres: movie.genres
		});
	}

	deleteMovie(movieId: string): Promise<void> {
		return this.store.doc<Movie>(`movies/${movieId}`).delete();
	}

	getAllMovies(): Observable<Movie[]> {
		return this.store.collection<Movie>('movies').valueChanges({ idField: 'id' });
	}
}
