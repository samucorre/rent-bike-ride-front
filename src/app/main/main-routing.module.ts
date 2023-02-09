import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { AuthGuard } from '../auth/auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { SizesComponent } from './sizes/sizes.component';
import { BikesComponent } from './bikes/bikes.component';
import {BrandsComponent } from './brands/brands.component';
import {ModelsComponent } from './models/models.component';

const contactsModule = () =>
  import('./contacts/contacts.module').then((x) => x.ContactsModule);

const routes: Routes = [
  {
    path: 'main',
    component: MainHomeComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['HOME'],
    },
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['CONTACTS'],
    },
  },
  {
    path: 'bikes',
    component: BikesComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['BIKES'],
    }
  },
  {
    path: 'sizes',
    component: SizesComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['SIZES'],
    },
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['BRANDS'],
    },
  },
  {
    path: 'models',
    component: BrandsComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['MODELS'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
