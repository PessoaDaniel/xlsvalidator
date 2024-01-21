import {Component} from '@angular/core';
import {RulesService} from "../shared/services/rules.service";
import {DropzoneCdkModule, FileInputValidators} from "@ngx-dropzone/cdk";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from "@angular/forms";
import {MatChipRow} from "@angular/material/chips";
import {NgIf} from "@angular/common";
import readXlsxFile, {Row} from 'read-excel-file'
import {Rule} from "../../models/Rule";


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatFormFieldModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    MatChipRow,
    NgIf
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  rules: Array<Rule> = [];
  form: FormGroup;
  sheetData:any;
  private fileInputValidators: ValidatorFn[] =  [
    FileInputValidators.accept('.xlsx')
  ]
  constructor(
    private rulesService: RulesService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      uploadedFile: [null, this.fileInputValidators]
    });
  }
  ngOnInit() {
    this.rulesService.rules.subscribe((rule: Rule) => {
      if (rule) {
        this.rules.push(rule);
      }
    });
  }
  clear() {}
  async readFile() {
    readXlsxFile(this.form.value.uploadedFile).then(
      (sheetData: Row[]) => this.sheetData = sheetData);
  }
}
