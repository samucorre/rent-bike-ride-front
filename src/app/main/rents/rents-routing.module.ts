import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentsLayoutComponent } from './rents-layout.component';
import { RentsComponent } from './rents.component';
import { EditRentComponent } from './edit-rent/edit-rent.component';


const routes: Routes = [
  {
    path: '',
    component: RentsLayoutComponent,
    children: [
      { path: "", component:RentsComponent },
      { path: 'add', component: EditRentComponent },
      { path: 'edit/:id', component: EditRentComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RentsRoutingModule { }
