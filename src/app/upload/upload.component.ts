import {Component} from '@angular/core';
import {RulesService} from "../shared/services/rules.service";
import {DropzoneCdkModule, FileInputValidators} from "@ngx-dropzone/cdk";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatChipRow} from "@angular/material/chips";


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatFormFieldModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    MatChipRow
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  rules: Array<any> = [];
  form: FormGroup;
  private finputValidatos =  [
    FileInputValidators.accept('.xls')
  ]
  constructor(
    private rulesService: RulesService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      uploadedFile: [null, this.finputValidatos]
    });
  }
  ngOnInit() {
    this.rulesService.rules.subscribe((rule) => {
      if (rule) {
        this.rules.push(rule);
      }
    });
  }
  clear() {}
}
