import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Size } from 'src/app/model/size';
import { SizeService } from 'src/app/services/size.service';
import { RESTResponse } from 'src/app/model/rest/response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  templateUrl: './edit-size.component.html',
  styleUrls: ['./edit-size.component.scss'],
})
export class EditSizeComponent implements OnInit {
  idSize: number;

  sizeForm: FormGroup;
  size: Size;

  constructor(
    private fb: FormBuilder,
    private sizeService: SizeService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.size = new Size();
  }

  ngOnInit() {
    this.createFormGroup();
    this.idSize = this.route.snapshot.params['id'];
    if (this.idSize) {
      this.sizeService.getSize(this.idSize).subscribe(
        response => {
          this.size = response.data;
          this.sizeForm.patchValue(this.size, { emitEvent: false, onlySelf: false });
          this.logger.info(this.size);
        }
      );
    }
  }



  onFormChanges() {
    this.sizeForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.sizeForm = this.fb.group({
      id: [this.size.id],
      size: [this.size.size]
     
    });
  }

  save() {
    const newSize: Size = Object.assign({}, this.sizeForm.value);
    if (newSize.id) {
      this.sizeService.editSize(newSize).subscribe((response) => {
        this.redirectList(response);
      });
    } else {
      this.sizeService.createSize(newSize).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: RESTResponse<number>) {
    if (response.responseCode === 'OK') {
      // const newSize: Size = Object.assign({}, this.sizeForm.value);
      this.router.navigate(['/sizes']);
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
    this.router.navigate(['/sizes']);
  }
}
