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
  import { ModelDataSource } from 'src/app/model/datasource/models.datasource'; 
  import { Model } from '../../model/model';
  import { ModelService } from '../../services/model.service';
  import { Router } from '@angular/router';
  
  @Component({
    // selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.scss'],
  })
  export class ModelsComponent implements OnInit, AfterViewInit {
    dataSource: ModelDataSource;
    displayedColumns = [
      'select',
      'model'
    ];
    fields = ['model', ''];//fields '' sin valor por bug filtro
  
    selection = new SelectionModel<Model>(true, []);
    error = false;
  
    @ViewChild('edit') editTemplate: any;
    highlightedRow: Model;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('input') input: ElementRef;
  
    constructor(
      private modelService: ModelService,
      private snackBar: MatSnackBarComponent,
      private translate: TranslateService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.dataSource = new ModelDataSource(this.modelService);
      const pageFilter = new AnyPageFilter(
        '',
        this.fields.map((field) => new AnyField(field)),
        0,
        20,
        'model'
      );
      this.dataSource.getModels(pageFilter);
    }
  
    ngAfterViewInit(): void {
      // server-side search
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.loadModelsPage();
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
            this.loadModelsPage();
          })
        )
        .subscribe();
    }
  
    loadModelsPage() {
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
      this.dataSource.getModels(pageFilter);
    }
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.modelsSubject.value.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.modelsSubject.value.forEach((row) =>
            this.selection.select(row)
          );
    }
  
    delete() {
      const model = this.selection.selected[0];
      this.selection.deselect(model);
      if (this.selection.selected && this.selection.selected.length === 0) {
        this.modelService.deleteModel(model.id).subscribe((response) => {
          if (response.responseCode !== 'OK') {
            this.error = true;
          } else {
            this.loadModelsPage();
          }
        });
      } else {
        this.modelService.deleteModel(model.id).subscribe((response) => {
          if (response.responseCode !== 'OK') {
            this.error = true;
          }
          this.delete();
        });
      }
    }
  
    onAdd() {
      this.router.navigate(['/models/add']);
    }
  
    onEdit(row: Model) {
      this.highlightedRow = row;
      this.router.navigate(['/models/edit/' + row.id]);
    }
  }