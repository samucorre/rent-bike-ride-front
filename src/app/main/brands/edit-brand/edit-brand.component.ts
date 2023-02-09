import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from 'src/app/model/brand';
import { BrandService } from 'src/app/services/brand.service';
import { RESTResponse } from 'src/app/model/rest/response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  idBrand: number;

  brandForm: FormGroup;
  brand: Brand;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.brand = new Brand();
  }

  ngOnInit() {
    this.createFormGroup();
    this.idBrand = this.route.snapshot.params['id'];
    if (this.idBrand) {
      this.brandService.getBrand(this.idBrand).subscribe(
        response => {
          this.brand = response.data;
          this.brandForm.patchValue(this.brand, { emitEvent: false, onlySelf: false });
          this.logger.info(this.brand);
        }
      );
    }
  }



  onFormChanges() {
    this.brandForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.brandForm = this.fb.group({
      id: [this.brand.id],
      brand: [this.brand.brand, Validators.required],
    });
  }

  save() {
    const newBrand: Brand = Object.assign({}, this.brandForm.value);
    if (newBrand.id) {
      this.brandService.editBrand(newBrand).subscribe((response) => {
        this.redirectList(response);
      });
    } else {
      this.brandService.createBrand(newBrand).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: RESTResponse<number>) {
    if (response.responseCode === 'OK') {
      // const newBrand: Brand = Object.assign({}, this.brandForm.value);
      this.router.navigate(['/brands']);
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
    this.router.navigate(['/brands']);
  }
}
