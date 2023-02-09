import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ModelService } from 'src/app/services/model.service';
import { Model } from '../model';
import { AnyPageFilter } from '../rest/filter';

export class ModelDataSource extends DataSource<Model> {
  modelsSubject = new BehaviorSubject<Model[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number;

  constructor(private modelService: ModelService) {
    super();
  }

  getModels(pageFilter: AnyPageFilter) {
    this.modelsSubject.next([]);
    this.loadingSubject.next(true);
    this.modelService.getModels(pageFilter).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.totalElements = response.totalElements;
        this.modelsSubject.next(response.data);
      }
    );
  }

  connect(): BehaviorSubject<Model[]> {
    return this.modelsSubject;
  }

  disconnect(): void {
    this.modelsSubject.complete();
    this.loadingSubject.complete();
  }
}