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
import { RentDataSource } from '../../model/datasource/rents.datasource';
import { Rent } from '../../model/rent';
import { RentService } from '../../services/rent.service';
import { Brand } from '../../model/brand';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.scss'],
})
export class RentsComponent implements OnInit, AfterViewInit {
  dataSource: RentDataSource;
  displayedColumns = [
    'select',
    'name',
    'price'
  ];
  fields = ['name', 'price'];

  selection = new SelectionModel<Rent>(true, []);
  error = false;

  @ViewChild('edit') editTemplate: any;
  highlightedRow: Rent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private rentService: RentService,
    private snackBar: MatSnackBarComponent,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new RentDataSource(this.rentService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'name'
    );
    this.dataSource.getRents(pageFilter);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadRentsPage();
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
          this.loadRentsPage();
        })
      )
      .subscribe();
  }

  loadRentsPage() {
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
    this.dataSource.getRents(pageFilter);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.rentsSubject.value.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.rentsSubject.value.forEach((row) =>
          this.selection.select(row)
        );
  }

  delete() {
    const rent = this.selection.selected[0];
    this.selection.deselect(rent);
    if (this.selection.selected && this.selection.selected.length === 0) {
      this.rentService.deleteRent(rent.id).subscribe((response) => {
        if (response.responseCode !== 'OK') {
          this.error = true;
        } else {
          this.loadRentsPage();
        }
      });
    } else {
      this.rentService.deleteRent(rent.id).subscribe((response) => {
        if (response.responseCode !== 'OK') {
          this.error = true;
        }
        this.delete();
      });
    }
  }

  onAdd() {
    this.router.navigate(['/rents/add']);
  }

  onEdit(row: Rent) {
    this.highlightedRow = row;
    this.router.navigate(['/rents/edit/' + row.id]);
  }
}
