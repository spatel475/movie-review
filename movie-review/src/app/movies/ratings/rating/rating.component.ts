import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from '../review.service';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, AfterViewInit {
	@Input() movieId: string;
	@Input() userId: string;

	stars: Observable<any>;
	myRating: number = 0;
	frontStarWidth = 0;

	private frontStars: HTMLElement;
	private starRatingWrapper: HTMLElement;
	private backStars: HTMLElement;

	frontStarId = '';
	backStarId = '';
	starRatingId = '';

	constructor(private reviewService: ReviewService) { }

	ngOnInit() {
		this.starRatingId = 'star-rating-' + this.movieId;
		this.backStarId = 'back-stars-' + this.movieId;
		this.frontStarId = 'front-stars-' + this.movieId;

		this.stars = this.reviewService.getMovieRatings(this.movieId)
		this.reviewService.getUserMovieRating(this.userId, this.movieId).subscribe({
			next: (ratings) => {
				this.myRating = ratings[0]?.value;
				if (this.myRating)
					this.setWidth(this.myRating);
			}
		});
	}

	ngAfterViewInit() {
		this.starRatingWrapper = document.getElementById(this.starRatingId);
		this.backStars = document.getElementById(this.backStarId);
		this.frontStars = document.getElementById(this.frontStarId);
	}

	deleteRating() {
		this.reviewService.deleteRating(this.userId, this.movieId);
	}

	setRating() {
		let value = +this.frontStars.style.width.replace('%', '');
		this.reviewService.setRating(this.userId, this.movieId, value);
	}

	hover(e) {
		this.setWidth(+this.round5(100 * e.layerX / this.backStars.clientWidth).toFixed(2));
	}

	private setWidth(width: number) {
		this.frontStarWidth = width;
		this.starRatingWrapper.title = this.frontStarWidth + '%';
	}

	private round5(x) {
		return Math.ceil(x / 5) * 5;
	}
}
