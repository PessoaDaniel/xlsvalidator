import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {UploadComponent} from "./upload.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DropzoneCdkModule} from "@ngx-dropzone/cdk";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";
import {MatIconModule} from "@angular/material/icon";
import {MatChipRow} from "@angular/material/chips";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    MatChipRow,
    SweetAlert2Module
  ]
})
export class UploadModule { }
