import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movie';

@Component({
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class NewMovieComponent implements OnInit {
	movie: Movie;
	title: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { movie: Movie; title: string; },
		private dialogRef: MatDialogRef<NewMovieComponent>
	) {
		this.movie = data.movie;
		this.title = data.title;
	}

	genres = [
		'Action',
		'Comedy',
		'Drama',
		'Fantasy',
		'Horror',
		'Mystery',
		'Romance',
		'Thriller',
		'Sci-Fi',
	]

	ngOnInit(): void {
	}

	cancel(): void {
		this.dialogRef.close();
	}

}
