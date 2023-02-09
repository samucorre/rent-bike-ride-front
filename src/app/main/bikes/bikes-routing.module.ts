import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesLayoutComponent } from './bikes-layout.component';
import { BikesComponent } from './bikes.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';


const routes: Routes = [
  {
    path: '',
    component: BikesLayoutComponent,
    children: [
      { path: "", component:BikesComponent },
      { path: 'add', component: EditBikeComponent },
      { path: 'edit/:id', component: EditBikeComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BikesRoutingModule { }
