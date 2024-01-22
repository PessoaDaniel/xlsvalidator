import { Injectable } from '@angular/core';
import {Rule} from "../../../models/Rule";
import {ValidationError} from "../../../models/ValidationError";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  validateKeys(fileData: Array<any>, rules: Rule[]):ValidationError[]|null {
    let fileKeys = fileData[0];
    let validationErrors:Array<ValidationError> = [];
    let count = 0;
    for (const fileKey of fileKeys) {
      count = count + 1;
      if (!fileKey || fileKey == '') {
        let error = new ValidationError(`Chave vazia detectada na linha 1 coluna ${count}`);
        error.type = 'error';
        validationErrors.push(error);
      }
    }
    for (const rule of rules) {
      if(rule.key) {
        if (!fileKeys.includes(rule.key.trim())) {
          let error = new ValidationError(`Chave não localizada no arquivo`);
          error.field = rule.key;
          if (rule.required) {
            error.message = 'Chave obrigatória não localizada no arquivo';
            error.type = 'error';
          }
          validationErrors.push(error);
        }
      }
    }

    if (validationErrors.length) {
      return validationErrors;
    }  else {
      return null;
    }
  }
  store(errors: ValidationError[]) {
    window.localStorage.setItem('RESULTS', JSON.stringify(errors));
  }

  getStored(): ValidationError[] {
    if (window.localStorage.getItem('RESULTS')) {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem('RESULTS'));
    } else {
      return  [];
    }
  }

  validateEmptyData(fileData: Array<any>) {
    let validationErrors:Array<ValidationError> = [];
    fileData.splice(0, 1);
    let rowCount: number = 1;
    for (const row of fileData) {
      rowCount = rowCount + 1;
      let cellCount: number = 0;
      for (const cell of row) {
        cellCount = cellCount + 1;
        if (!cell || cell == '') {
          let error = new ValidationError(`Valor em branco detectado na linha ${rowCount} coluna ${cellCount}`);
          validationErrors.push(error);
        }
      }
    }

    if (validationErrors.length) {
      return validationErrors;
    }
    return null;
  }
}
