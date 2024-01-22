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

  validateEmptyData(fileData: Array<any>, rules: Rule[]) {
    const preparedData:Array<any> = this.prepareColumns(fileData);
    const requires = this.getRequires(rules);
    let validationErrors:Array<ValidationError> = [];
    fileData.splice(0, 1);
    let colCount: number = 1;
    for (let col of preparedData) {
      if (col) {
        let cellCount =  1;
        for (let cell of col) {
          if (!cell || cell == '') {
            let error = new ValidationError(`Célula vazia na linha ${cellCount + 1} coluna ${colCount}`);
            if (requires.includes(colCount)) {
              error.type = 'error';
            }
            validationErrors.push(error);
          }
          cellCount = cellCount +1;
        }
        colCount = colCount + 1;
      }

    }

    if (validationErrors.length) {
      return validationErrors;
    }
    return null;
  }

  prepareColumns(sheetData: Array<any>) {
    let cols:Array<any> = [];
    const keys = sheetData[0];
    for (const key in keys) {
        cols[Number.parseInt(key) + 1] = [];
    }
    sheetData.splice(0, 1);

    for(const col in cols) {
      for( const row of sheetData) {
        let cellCount: number = 1;
        for (const cell of row) {
          if (Number.parseInt(col) == cellCount) {
            cols[Number.parseInt(col)].push(cell)
          }
          cellCount = cellCount + 1;
        }
      }
    }
    return cols;
  }
  getRequires (rules: Rule[]) {
    let requires:Array<any> = [];
    for (const rule of rules) {
      if (rule.required) {
        requires.push(rules.indexOf(rule) + 1);
      }
    }
    return requires;
  }
}
