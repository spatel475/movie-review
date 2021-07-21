import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor() {}

  ngOnInit(): void {}

  columnDefs: ColDef[] = [
    { field: 'title', sortable: true },
    { field: 'description', sortable: true },
    { field: 'genre', sortable: true },
  ];
}
