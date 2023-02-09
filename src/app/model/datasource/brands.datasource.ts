import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from '../brand';
import { AnyPageFilter } from '../rest/filter';

export class BrandDataSource extends DataSource<Brand> {
  brandsSubject = new BehaviorSubject<Brand[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number;

  constructor(private brandService: BrandService) {
    super();
  }

  getBrands(pageFilter: AnyPageFilter) {
    this.brandsSubject.next([]);
    this.loadingSubject.next(true);
    this.brandService.getBrands(pageFilter).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.totalElements = response.totalElements;
        this.brandsSubject.next(response.data);
      }
    );
  }

  connect(): BehaviorSubject<Brand[]> {
    return this.brandsSubject;
  }

  disconnect(): void {
    this.brandsSubject.complete();
    this.loadingSubject.complete();
  }
}
