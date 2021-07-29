import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReviewService } from '../review.service';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
	@Input() movieId: string;
	@Input() userId: string;

	stars: Observable<any>;
	myRating: number;

	constructor(private reviewService: ReviewService) {
	}

	ngOnInit() {
		this.stars = this.reviewService.getMovieRatings(this.movieId)
		this.reviewService.getUserMovieRating(this.userId, this.movieId).subscribe({
			next: (x) => this.myRating = x[0]?.value
		});
	}


	sliderChanged(value: number) {
		this.reviewService.setRating(this.userId, this.movieId, value);

	}
}
