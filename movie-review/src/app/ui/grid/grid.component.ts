import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
	@Input() columnDefs: ColDef[] = [];
	@Input() rowData: Promise<any>[] = [];
	@Input() gridOptions: GridOptions;

	constructor() { }

	ngOnInit(): void {
	}

}
