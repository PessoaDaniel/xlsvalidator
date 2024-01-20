import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  isDarkMode: BehaviorSubject<any> = new BehaviorSubject(false);
}
