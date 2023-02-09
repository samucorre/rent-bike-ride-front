import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SizeService } from 'src/app/services/size.service';
import { Size } from '../size';
import { AnyPageFilter } from '../rest/filter';

export class SizeDataSource extends DataSource<Size> {
  sizesSubject = new BehaviorSubject<Size[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number;

  constructor(private sizeService: SizeService) {
    super();
  }

  getSizes(pageFilter: AnyPageFilter) {
    this.sizesSubject.next([]);
    this.loadingSubject.next(true);
    this.sizeService.getSizes(pageFilter).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.totalElements = response.totalElements;
        this.sizesSubject.next(response.data);
      }
    );
  }

  connect(): BehaviorSubject<Size[]> {
    return this.sizesSubject;
  }

  disconnect(): void {
    this.sizesSubject.complete();
    this.loadingSubject.complete();
  }
}
