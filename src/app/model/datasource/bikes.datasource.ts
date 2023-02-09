import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BikeService } from 'src/app/services/bike.service';
import { Bike } from '../bike';
import { AnyPageFilter } from '../rest/filter';

export class BikeDataSource extends DataSource<Bike> {
  bikesSubject = new BehaviorSubject<Bike[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number;

  constructor(private bikeService: BikeService) {
    super();
  }

  getBikes(pageFilter: AnyPageFilter) {
    this.bikesSubject.next([]);
    this.loadingSubject.next(true);
    this.bikeService.getBikes(pageFilter).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.totalElements = response.totalElements;
        this.bikesSubject.next(response.data);
      }
    );
  }

  connect(): BehaviorSubject<Bike[]> {
    return this.bikesSubject;
  }

  disconnect(): void {
    this.bikesSubject.complete();
    this.loadingSubject.complete();
  }
}
