import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const modules = [
MatToolbarModule,
MatButtonModule,
MatIconModule,
MatCardModule,
MatTableModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatSnackBarModule,
MatSidenavModule,
MatListModule,
MatPaginatorModule,
MatSortModule,
MatDialogModule,
MatRadioModule,
MatExpansionModule,
MatCheckboxModule,
FormsModule,
ReactiveFormsModule,
MatProgressSpinnerModule
];


@NgModule({
exports: modules
})
export class MaterialModule {}