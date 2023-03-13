import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RentService } from 'src/app/services/rent.service';
import { Rent } from '../rent';
import { AnyPageFilter } from '../rest/filter';

export class RentDataSource extends DataSource<Rent> {
  rentsSubject = new BehaviorSubject<Rent[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number;

  constructor(private rentService: RentService) {
    super();
  }

  getRents(pageFilter: AnyPageFilter) {
    this.rentsSubject.next([]);
    this.loadingSubject.next(true);
    this.rentService.getRents(pageFilter).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.totalElements = response.totalElements;
        this.rentsSubject.next(response.data);
      }
    );
  }

  connect(): BehaviorSubject<Rent[]> {
    return this.rentsSubject;
  }

  disconnect(): void {
    this.rentsSubject.complete();
    this.loadingSubject.complete();
  }
}
