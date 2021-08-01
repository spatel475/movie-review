import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Rating } from 'src/app/models/rating';

@Injectable({
	providedIn: 'root'
})
export class ReviewService {

	constructor(private afs: AngularFirestore) { }

	// Review that belong to a user
	getUserRatings(userId: string): Observable<Rating[]> {
		return this.afs.collection<Rating>('ratings', ref => ref.where('userId', '==', userId)).valueChanges();
	}

	// All ratingss for a Movie
	getMovieRatings(movieId: string): Observable<Rating[]> {
		return this.afs.collection<Rating>('ratings', ref => ref.where('movieId', '==', movieId)).valueChanges();
	}

	getUserMovieRating(userId: string, movieId: string): Observable<Rating[]> {
		return this.afs.collection<Rating>('ratings', ref => ref.where('movieId', '==', movieId).where('userId', '==', userId)).valueChanges();
	}

	// Create or update rating
	setRating(userId: string, movieId: string, value: number) {
		// rating document data
		const rating: Rating = { userId, movieId, value };

		// Custom doc ID for relationship
		const ratingPath = `ratings/${rating.userId}_${rating.movieId}`;

		// Set the data, return the promise
		return this.afs.doc(ratingPath).set(rating)
	}

	deleteRating(userId: string, movieId: string) {
		// Custom doc ID for relationship
		const ratingPath = `ratings/${userId}_${movieId}`;

		// Set the data, return the promise
		return this.afs.doc(ratingPath).delete();
	}
}
