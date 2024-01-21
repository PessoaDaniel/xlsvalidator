import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Rule} from "../../../models/Rule";

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  rules: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  store (rule: Rule) {
    let storedRules: Array<Rule> = [];
    if (!window.localStorage.getItem('RULES')) {
      storedRules.push(rule);
      window.localStorage.setItem('RULES', JSON.stringify(storedRules));
    } else {
      // @ts-ignore
      storedRules = JSON.parse(window.localStorage.getItem('RULES'));
      storedRules.push(rule);
      window.localStorage.setItem('RULES', JSON.stringify(storedRules));

    }

  }

  getStored(): Rule[] {
    if (window.localStorage.getItem('RULES')) {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem('RULES'));
    } else {
      return [];
    }
  }

}
