import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsLayoutComponent } from './brands-layout.component';
import { BrandsComponent } from './brands.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';


const routes: Routes = [
  {
    path: '',
    component: BrandsLayoutComponent,
    children: [
      { path: "", component:BrandsComponent },
      { path: 'add', component: EditBrandComponent },
      { path: 'edit/:id', component: EditBrandComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandsRoutingModule { }
