import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SizesLayoutComponent } from './sizes-layout.component';
import { SizesComponent } from './sizes.component';
import { EditSizeComponent } from './edit-size/edit-size.component';


const routes: Routes = [
  {
    path: '',
    component: SizesLayoutComponent,
    children: [
      { path: "", component:SizesComponent },
      { path: 'add', component: EditSizeComponent },
      { path: 'edit/:id', component: EditSizeComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SizesRoutingModule { }
