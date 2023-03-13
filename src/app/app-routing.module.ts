import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'contacts', loadChildren: () => import('./main/contacts/contacts.module').then(x => x.ContactsModule) },
  { path: 'bikes', loadChildren: () => import('./main/bikes/bikes.module').then(x => x.BikesModule) },
  { path: 'brands', loadChildren: () => import('./main/brands/brands.module').then(x => x.BrandsModule) },
  { path: 'models', loadChildren: () => import('./main/models/models.module').then(x => x.ModelsModule) },
  { path: 'sizes', loadChildren: () => import('./main/sizes/sizes.module').then(x => x.SizesModule) },
  { path: 'rents', loadChildren: () => import('./main/rents/rents.module').then(x => x.RentsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
