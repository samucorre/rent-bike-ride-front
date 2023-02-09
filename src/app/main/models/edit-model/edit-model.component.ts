import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from 'src/app/model/model';
import { ModelService } from 'src/app/services/model.service';
import { Brand } from 'src/app/model/brand';
import { BrandService } from 'src/app/services/brand.service';
import { RESTResponse } from 'src/app/model/rest/response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { AnyField, AnyPageFilter } from 'src/app/model/rest/filter';


@Component({
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss'],
})
export class EditModelComponent implements OnInit {
  idModel: number;

  modelForm: FormGroup;
  model: Model;
  brands: Brand[];
  fields = ['','brand'];

  constructor(
    private fb: FormBuilder,
    private modelService: ModelService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.model = new Model();
  }

  ngOnInit() {
    this.createFormGroup();
    this.idModel = this.route.snapshot.params['id'];
    if (this.idModel) {
      this.modelService.getModel(this.idModel).subscribe(
        response => {
          this.model = response.data;
          this.modelForm.patchValue(this.model, { emitEvent: false, onlySelf: false });
          this.logger.info(this.model);
        }
      );
    }
    const brandPageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'brand'
      );

    this.brandService.getBrands(brandPageFilter).subscribe(
      response => {
        this.brands = response.data;
      }
      
    );
  }



  onFormChanges() {
    this.modelForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.modelForm = this.fb.group({
      id: [this.model.id],
      model: [this.model.model],
      brand: [this.model.brand, Validators.required]
     
    });
  }

  save() {
    const newModel: Model = Object.assign({}, this.modelForm.value);
    if (newModel.id) {
      this.modelService.editModel(newModel).subscribe((response) => {
        this.redirectList(response);
      });
    } else {
      this.modelService.createModel(newModel).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: RESTResponse<number>) {
    if (response.responseCode === 'OK') {
      // const newModel: Model = Object.assign({}, this.modelForm.value);
      this.router.navigate(['/models']);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  cancel() {
    // this.saveDetails.emit();
    this.router.navigate(['/models']);
  }
}