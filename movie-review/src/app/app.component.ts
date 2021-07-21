import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: AngularFirestore) {}

  movies = this.store
    .collection('movies')
    .valueChanges({ idField: 'id' }) as Observable<Movie[]>;

  uniqueId = 1;
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
  title = 'Movie Review';
}
