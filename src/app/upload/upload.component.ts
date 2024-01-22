import {Component} from '@angular/core';
import {RulesService} from "../shared/services/rules.service";
import {DropzoneCdkModule, FileInputValidators} from "@ngx-dropzone/cdk";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from "@angular/forms";
import {MatChipRow} from "@angular/material/chips";
import {NgForOf, NgIf} from "@angular/common";
import readXlsxFile, {Row} from 'read-excel-file'
import {Rule} from "../../models/Rule";
import {ValidationService} from "../shared/services/validation.service";
import {SystemService} from "../shared/services/system.service";
import {ValidationError} from "../../models/ValidationError";


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
    NgIf,
    NgForOf
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  rules: Array<Rule> = [];
  validationErrors: ValidationError[]|null = null;
  finishedValidation: boolean = false;
  form: FormGroup;
  sheetData:any;
  private fileInputValidators: ValidatorFn[] =  [
    FileInputValidators.accept('.xlsx')
  ]
  constructor(
    private rulesService: RulesService,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private validationService: ValidationService
    ) {
    this.form = this.formBuilder.group({
      uploadedFile: [null, this.fileInputValidators]
    });
  }
  ngOnInit() {
    this.rules = this.rulesService.getStored();
    this.validationErrors = this.validationService.getStored();
    if (this.validationErrors.length) {
      this.finishedValidation = true;
    }

  }
  ngAfterViewInit() {
    if (this.rules.length) {
      setTimeout(() =>this.systemService.cantUpload.next(false), 200);
    }
  }
  clear() {}
  async readFile() {
    readXlsxFile(this.form.value.uploadedFile).then(
      (sheetData: Row[]) => {
        this.sheetData = sheetData;
        let keysValidation = this.validationService.validateKeys(this.sheetData, this.rules);
        let emptyDataValidation =  this.validationService.validateEmptyData(this.sheetData, this.rules);
        if (this.validationErrors) {
          if (keysValidation) {
            keysValidation.forEach((error) => this.validationErrors?.push(error));

          }
          if (emptyDataValidation) {
            emptyDataValidation.forEach(error => this.validationErrors?.push(error));

          }
        }
        this.finishedValidation = true;
        if (this.validationErrors) {
          this.validationService.store(this.validationErrors);
        } else {
          this.validationService.store([]);
        }
      });
  }
  clearUpload() {
    this.form.reset();
    this.finishedValidation = false;
    this.validationErrors = [];
    this.validationService.store([]);
  }
}
