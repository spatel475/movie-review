import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { TableColDef } from '../ui/models/table-column-def';
import { IsDeviceMobile } from '../utils/mobile-checker';
import { MovieService } from './movie.service';
import { NewMovieComponent as MovieComponent } from './movie/movie.component';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class MoviesComponent {
	// ui properties
	displayedColumns: string[] = ['title', 'genres', 'avgRating'];
	columnDef: TableColDef[] = [{
		key: 'title',
		header: 'Title',
	},
	{
		key: 'genres',
		header: 'Genre',
	},
	{
		key: 'avgRating',
		header: 'Rating',
	}]
	fabMenuButtons: MatFabMenu[] = [
		{
			id: 1,
			icon: 'add',
			tooltip: 'Add Movie',
			tooltipPosition: 'left'
		},
		{
			id: 2,
			icon: 'thumbs_up_down',
			tooltip: 'Rate a movie',
			tooltipPosition: 'left'
		},
	];
	isMobile = IsDeviceMobile();
	expandedMovie: Movie | null;

	movies: Observable<Movie[]>;

	constructor(private movieService: MovieService, private dialog: MatDialog) {
		this.movies = this.movieService.getAllMovies();
	}

	menuItemSelected(id: number) {
		switch (id) {
			case 1:
				this.addNewMovie();
				break;
			default:
				break;
		}

	}

	editMovie(movie: Movie) {
		this.dialog.open(MovieComponent, {
			data: { movie: movie, title: 'Edit Movie' }
		}).afterClosed().subscribe({
			next: (m) => {
				if (m)
					this.movieService.updateMovie(m);
			},
			error: (err) => console.warn(err)
		})
	}

	private addNewMovie() {
		let movie: Movie = {
			id: '',
			title: '',
			description: '',
			genres: [],
			avgRating: 0,
		}

		this.dialog.open(MovieComponent, {
			data: { movie: movie, title: 'Add Movie' }
		}).afterClosed().subscribe({
			next: (m) => {
				if (m)
					this.movieService.createMovie(m);
			},
			error: (err) => console.warn(err)
		})
	}
}
