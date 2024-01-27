import {Component} from '@angular/core';
import {RulesService} from "../shared/services/rules.service";
import {FileInputValidators} from "@ngx-dropzone/cdk";
import {FormBuilder, FormGroup,ValidatorFn} from "@angular/forms";
import readXlsxFile, {Row} from 'read-excel-file'
import {Rule} from "../../models/Rule";
import {ValidationService} from "../shared/services/validation.service";
import {SystemService} from "../shared/services/system.service";
import {ValidationError} from "../../models/ValidationError";
import {Router} from "@angular/router";
import {ErrorService} from "../shared/services/error.service";

@Component({
  selector: 'app-upload',
  standalone: false,
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
    private validationService: ValidationService,
    private router: Router,
    private errorService: ErrorService
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
      setTimeout(async () => {
        if (!this.validateRules()) {
         await this.router.navigate(["/"]);
         await this.errorService.error('Suas configurações de coluna são inválidas');
        }
        this.systemService.cantUpload.next(false)
      }, 200);
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
  private validateRules ():boolean {
    for (const rule of this.rules) {
      const ruleKeys = Object.keys(rule);
      console.log(ruleKeys);
      if (!ruleKeys.length) {
        return false;
      }
      if (!ruleKeys.includes('key')) {
        return false;
      }
      if (!ruleKeys.includes('required')) {
        return false;
      }
    }
    return true;
  }
}
