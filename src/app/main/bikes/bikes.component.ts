import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
  } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { merge, fromEvent } from 'rxjs';
  import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
  import { SelectionModel } from '@angular/cdk/collections';
  import { AnyPageFilter, AnyField, SortFilter } from 'src/app/model/rest/filter';
  import { TranslateService } from '@ngx-translate/core';
  import { MatSnackBarComponent } from 'src/app/components/mat-snack-bar/mat-snack-bar.component';
  import { BikeDataSource } from '../../model/datasource/bikes.datasource';
  import { Bike } from '../../model/bike';
  import { BikeService } from '../../services/bike.service';
  import { Brand } from '../../model/brand';
  import { BrandService } from '../../services/brand.service';
  import { Router } from '@angular/router';
  
  @Component({
    // selector: 'app-bikes',
    templateUrl: './bikes.component.html',
    styleUrls: ['./bikes.component.scss'],
  })
  export class BikesComponent implements OnInit, AfterViewInit {
    dataSource: BikeDataSource;
    displayedColumns = [
      'select',
      'brand',
      'model',
      'size',
      'use',
      'units'
    ];
    fields = ['brand.brand', 'model', 'size.size',  'use', 'units'];
  
    selection = new SelectionModel<Bike>(true, []);
    error = false;
  
    @ViewChild('edit') editTemplate: any;
    highlightedRow: Bike;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('input') input: ElementRef;
  
    constructor(
      private bikeService: BikeService,
      private snackBar: MatSnackBarComponent,
      private translate: TranslateService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.dataSource = new BikeDataSource(this.bikeService);
      const pageFilter = new AnyPageFilter(
        '',
        this.fields.map((field) => new AnyField(field)),
        0,
        20,
        'brand'
      );
      this.dataSource.getBikes(pageFilter);
    }
  
    ngAfterViewInit(): void {
      // server-side search
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.loadBikesPage();
          })
        )
        .subscribe();
  
      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
        this.selection.clear();
      });
  
      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          tap(() => {
            this.loadBikesPage();
          })
        )
        .subscribe();
    }
  
    loadBikesPage() {
      this.selection.clear();
      this.error = false;
      const pageFilter = new AnyPageFilter(
        this.input.nativeElement.value,
        this.fields.map((field) => new AnyField(field)),
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
      pageFilter.order = [];
      pageFilter.order.push(
        new SortFilter(this.sort.active, this.sort.direction.toString())
      );
      this.dataSource.getBikes(pageFilter);
    }
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.bikesSubject.value.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.bikesSubject.value.forEach((row) =>
            this.selection.select(row)
          );
    }
  
    delete() {
      const bike = this.selection.selected[0];
      this.selection.deselect(bike);
      if (this.selection.selected && this.selection.selected.length === 0) {
        this.bikeService.deleteBike(bike.id).subscribe((response) => {
          if (response.responseCode !== 'OK') {
            this.error = true;
          } else {
            this.loadBikesPage();
          }
        });
      } else {
        this.bikeService.deleteBike(bike.id).subscribe((response) => {
          if (response.responseCode !== 'OK') {
            this.error = true;
          }
          this.delete();
        });
      }
    }
  
    onAdd() {
      this.router.navigate(['/bikes/add']);
    }
  
    onEdit(row: Bike) {
      this.highlightedRow = row;
      this.router.navigate(['/bikes/edit/' + row.id]);
    }
  }
  