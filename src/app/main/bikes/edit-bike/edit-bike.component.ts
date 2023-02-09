import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bike } from 'src/app/model/bike';
import { BikeService } from 'src/app/services/bike.service';
import { RESTResponse } from 'src/app/model/rest/response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { Brand } from 'src/app/model/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Size } from 'src/app/model/size';
import { SizeService } from 'src/app/services/size.service';
import { Model } from 'src/app/model/model';
import { ModelService } from 'src/app/services/model.service';
import { AnyField, AnyPageFilter } from 'src/app/model/rest/filter';

@Component({
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.scss'],
})
export class EditBikeComponent implements OnInit {
  idBike: number;

  bikeForm: FormGroup;
  bike: Bike;
  brands: Brand[];
  sizes:Size[];
  models: Model[];
  fields = ['','brand','model','size'];
  


  constructor(
    private fb: FormBuilder,
    private bikeService: BikeService,
    private brandService: BrandService,
    private modelService: ModelService,
    private sizeService: SizeService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.bike = new Bike();
  }

  ngOnInit() {
    this.createFormGroup();
    this.idBike = this.route.snapshot.params['id'];
    if (this.idBike) {
      this.bikeService.getBike(this.idBike).subscribe(
        response => {
          this.bike = response.data;
          this.bikeForm.patchValue(this.bike, { emitEvent: false, onlySelf: false });
          this.logger.info(this.bike);
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
    const sizePageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'size'
      );
    this.sizeService.getSizes(sizePageFilter).subscribe(
      response => {
        this.sizes = response.data;
      }
    );
    const modelPageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'model'
      );
    this.modelService.getModels(modelPageFilter).subscribe(
      response => {
        this.models = response.data;
      }
    );
  }



  onFormChanges() {
    this.bikeForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.bikeForm = this.fb.group({
      id: [this.bike.id],
      brand: [this.bike.brand, Validators.required],
      model: [this.bike.model, Validators.required],
      size: [this.bike.size],
      use: [this.bike.use],
      units: [this.bike.units],
    });
  }

  save() {
    const newBike: Bike = Object.assign({}, this.bikeForm.value);
    if (newBike.id) {
      this.bikeService.editBike(newBike).subscribe((response) => {
        this.redirectList(response);
      });
    } else {
      this.bikeService.createBike(newBike).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: RESTResponse<number>) {
    if (response.responseCode === 'OK') {
      // const newBike: Bike = Object.assign({}, this.bikeForm.value);
      this.router.navigate(['/bikes']);
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
    this.router.navigate(['/bikes']);
  }
}
