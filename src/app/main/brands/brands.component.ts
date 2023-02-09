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
  import { BrandDataSource } from '../../model/datasource/brands.datasource';
  import { Brand } from '../../model/brand';
  import { BrandService } from '../../services/brand.service';
  import { Router } from '@angular/router';
  
  @Component({
    // selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss'],
  })
  export class BrandsComponent implements OnInit, AfterViewInit {
    dataSource: BrandDataSource;
    displayedColumns = [
      'select',
      'brand'
    ];
    fields = ['brand', ''];//fields '' sin valor por bug filtro
  
    selection = new SelectionModel<Brand>(true, []);
    error = false;
  
    @ViewChild('edit') editTemplate: any;
    highlightedRow: Brand;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('input') input: ElementRef;
  
    constructor(
      private brandService: BrandService,
      private snackBar: MatSnackBarComponent,
      private translate: TranslateService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.dataSource = new BrandDataSource(this.brandService);
      const pageFilter = new AnyPageFilter(
        '',
        this.fields.map((field) => new AnyField(field)),
        0,
        20,
        'brand'
      );
      this.dataSource.getBrands(pageFilter);
    }
  
    ngAfterViewInit(): void {
      // server-side search
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.loadBrandsPage();
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
            this.loadBrandsPage();
          })
        )
        .subscribe();
    }
  
    loadBrandsPage() {
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
      this.dataSource.getBrands(pageFilter);
    }
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.brandsSubject.value.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.brandsSubject.value.forEach((row) =>
            this.selection.select(row)
          );
    }
  
    delete() {
      const brand = this.selection.selected[0];
      this.selection.deselect(brand);
      if (this.selection.selected && this.selection.selected.length === 0) {
        this.brandService.deleteBrand(brand.id).subscribe((response) => {
          if (response.responseCode !== 'OK') {
            this.error = true;
          } else {
            this.loadBrandsPage();
          }
        });
      } else {
        this.brandService.deleteBrand(brand.id).subscribe((response) => {
          if (response.responseCode !== 'OK') {
            this.error = true;
          }
          this.delete();
        });
      }
    }
  
    onAdd() {
      this.router.navigate(['/brands/add']);
    }
  
    onEdit(row: Brand) {
      this.highlightedRow = row;
      this.router.navigate(['/brands/edit/' + row.id]);
    }
  }
  