import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterandloginComponent } from './registerandlogin.component';
import { RegisterandloginRoutingModule } from './registerandlogin-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [RegisterandloginComponent],
  imports: [
    CommonModule, FormsModule, 
    RegisterandloginRoutingModule, 
    MatInputModule, MatCardModule, 
    MatButtonModule, MatFormFieldModule,
    MatIconModule,
  ],
  exports: [
   
  ]
})
export class RegisterandloginModule {}
