import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  rules: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

}
