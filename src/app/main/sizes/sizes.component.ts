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
import { SizeDataSource } from 'src/app/model/datasource/size.datasource'; 
import { Size } from '../../model/size';
import { SizeService } from '../../services/size.service';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
})
export class SizesComponent implements OnInit, AfterViewInit {
  dataSource: SizeDataSource;
  displayedColumns = [
    'select',
    'size'
  ];
  fields = ['size', ''];//fields '' sin valor por bug filtro

  selection = new SelectionModel<Size>(true, []);
  error = false;

  @ViewChild('edit') editTemplate: any;
  highlightedRow: Size;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private sizeService: SizeService,
    private snackBar: MatSnackBarComponent,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new SizeDataSource(this.sizeService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'size'
    );
    this.dataSource.getSizes(pageFilter);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSizesPage();
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
          this.loadSizesPage();
        })
      )
      .subscribe();
  }

  loadSizesPage() {
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
    this.dataSource.getSizes(pageFilter);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.sizesSubject.value.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.sizesSubject.value.forEach((row) =>
          this.selection.select(row)
        );
  }

  delete() {
    const size = this.selection.selected[0];
    this.selection.deselect(size);
    if (this.selection.selected && this.selection.selected.length === 0) {
      this.sizeService.deleteSize(size.id).subscribe((response) => {
        if (response.responseCode !== 'OK') {
          this.error = true;
        } else {
          this.loadSizesPage();
        }
      });
    } else {
      this.sizeService.deleteSize(size.id).subscribe((response) => {
        if (response.responseCode !== 'OK') {
          this.error = true;
        }
        this.delete();
      });
    }
  }

  onAdd() {
    this.router.navigate(['/sizes/add']);
  }

  onEdit(row: Size) {
    this.highlightedRow = row;
    this.router.navigate(['/sizes/edit/' + row.id]);
  }
}
