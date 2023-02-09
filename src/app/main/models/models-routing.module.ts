import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelsLayoutComponent } from './models-layout.component';
import { ModelsComponent } from './models.component';
import { EditModelComponent } from './edit-model/edit-model.component';


const routes: Routes = [
  {
    path: '',
    component: ModelsLayoutComponent,
    children: [
      { path: "", component:ModelsComponent },
      { path: 'add', component: EditModelComponent },
      { path: 'edit/:id', component: EditModelComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModelsRoutingModule { }