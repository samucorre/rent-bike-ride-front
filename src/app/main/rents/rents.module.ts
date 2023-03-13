import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentsRoutingModule } from './rents-routing.module';
import { RentsComponent } from './rents.component';
import { EditRentComponent } from './edit-rent/edit-rent.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { RentsLayoutComponent } from './rents-layout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RentsRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        // MatTabsModule,
        // MatSidenavModule,
        // MatTooltipModule,
        // MatDialogModule,
        // MatToolbarModule,
        // MatListModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        // MatExpansionModule,
        MatCheckboxModule,
        // BrowserModule,
        // ReactiveFormsModule,
        // FlexLayoutModule,
        // MatChipsModule,
        TranslateModule,
    ],
    declarations: [
        RentsComponent,
        EditRentComponent,
        RentsLayoutComponent
    ]
})
export class RentsModule { }
